import CountdownTimer from "./CountDownTimer";

const ProductPrice = ({
    product,
    large = false,
}) => {
    const isFlashSale =
        product?.isFlashSale &&
        product?.flashSalePrice &&
        product?.flashSaleEndAt &&
        new Date(product.flashSaleEndAt) >
        new Date();

    const originalPrice = Number(
        product?.oldPrice ||
        product?.price ||
        0
    );

    const salePrice = Number(
        product?.flashSalePrice || 0
    );

    const displayPrice = isFlashSale
        ? salePrice
        : Number(product?.price || 0);

    const discountPercentage =
        isFlashSale &&
            originalPrice > salePrice
            ? Math.round(
                ((originalPrice - salePrice) /
                    originalPrice) *
                100
            )
            : 0;

    return (
        <div className="space-y-3">

            {/* PRICE */}

            <div className="flex items-center gap-3 flex-wrap">

                <span
                    className={`
            font-extrabold
            ${large
                            ? "text-3xl sm:text-4xl"
                            : "text-xl"
                        }
            ${isFlashSale
                            ? "text-blue-600"
                            : "text-slate-900"
                        }
          `}
                >
                    ₦{displayPrice.toLocaleString()}
                </span>

                {isFlashSale && (
                    <>
                        <span
                            className="
                text-sm
                sm:text-base
                text-slate-400
                line-through
              "
                        >
                            ₦{originalPrice.toLocaleString()}
                        </span>

                        {discountPercentage > 0 && (
                            <span
                                className="
                  px-2
                  py-1
                  rounded-md
                  bg-amber-100
                  text-amber-700
                  text-xs
                  font-bold
                "
                            >
                                -{discountPercentage}%
                            </span>
                        )}
                    </>
                )}

            </div>

            {/* FLASH SALE COUNTDOWN */}

            {isFlashSale && (
                <div
                    className="
            flex
            items-center
            justify-between
            gap-3
            max-w-md
            px-4
            py-3
            rounded-xl
            bg-blue-50
            border
            border-blue-100
            text-blue-700
          "
                >
                    <div>
                        <p className="text-xs font-semibold">
                            Flash Sale
                        </p>

                        <p className="text-[10px] text-blue-500">
                            Offer ends soon
                        </p>
                    </div>

                    <CountdownTimer
                        endDate={
                            product.flashSaleEndAt
                        }
                    />
                </div>
            )}

        </div>
    );
};

export default ProductPrice;