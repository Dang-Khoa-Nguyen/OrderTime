from difflib import SequenceMatcher

class CheckAnswer:

    @staticmethod
    def similarity(a: str, b: str) -> float:
        # normalize both strings
        a = a.lower().strip()
        b = b.lower().strip()
        return SequenceMatcher(None, a, b).ratio()

    @staticmethod
    def find_best_match(user_item: str, result_orders: list) -> dict:
        best_score = 0
        best_match = None

        for result in result_orders:
            score = CheckAnswer.similarity(user_item, result["item"])
            if score > best_score:
                best_score = score
                best_match = result

        return {
            "matched": best_match,
            "itemScore": round(best_score * 100)
        }

    @staticmethod
    def compare_orders(user_orders: list, result_orders: list) -> dict:
        if not user_orders or not result_orders:
            return {"overallScore": 0, "details": [], "error": "Missing orders"}

        details = []
        total_score = 0

        # Loop over result_orders, not user_orders
        for result_order in result_orders:
            # find best matching user answer for this result item
            best_score = 0
            best_user_order = None

            for user_order in user_orders:
                score = CheckAnswer.similarity(user_order["item"], result_order["item"])
                if score > best_score:
                    best_score = score
                    best_user_order = user_order

            item_score = round(best_score * 100)

            # check qty only if we found a match
            qty_correct = False
            if best_user_order:
                qty_correct = int(best_user_order["qty"]) == int(result_order["qty"])

            # penalize wrong qty
            final_score = item_score if qty_correct else item_score * 0.5

            # if no match found at all, score is 0
            if best_score < 0.5:  # threshold — below 50% similarity = no match
                final_score = 0

            total_score += final_score
            details.append({
                "expectedItem": result_order["item"],
                "expectedQty": result_order["qty"],
                "userItem": best_user_order["item"] if best_user_order else None,
                "userQty": best_user_order["qty"] if best_user_order else None,
                "itemScore": item_score,
                "qtyCorrect": qty_correct,
                "finalScore": round(final_score)
            })

        # divide by result length, not user length
        overall_score = round(total_score / len(result_orders))

        return {
            "overallScore": overall_score,
            "details": details
        }