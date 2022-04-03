import { useEffect, useState } from "react";
import { Modal } from "../../common";
import {
  purchaseMarketItem,
  marketContract,
  nftContract,
  loadMarketItems,
} from "../../../../utils/interact";
import { ethers } from "ethers";

// const defaultOrder = {
//   price: "",
//   email: "",
//   confirmationEmail: "",
// };

// const _createFormState = (isDisabled = false, message = "") => ({
//   isDisabled,
//   message,
// });

// const createFormState = (
//   { price, email, confirmationEmail },
//   hasAgreedTOS,
//   isNewPurchase
// ) => {
//   if (!price || Number(price) <= 0) {
//     return _createFormState(true, "Price is not valid.");
//   }

//   if (isNewPurchase) {
//     if (confirmationEmail.length === 0 || email.length === 0) {
//       return _createFormState(true);
//     } else if (email !== confirmationEmail) {
//       return _createFormState(true, "Email are not matching.");
//     }
//   }

//   if (!hasAgreedTOS) {
//     return _createFormState(
//       true,
//       "You need to agree with terms of service in order to submit the form"
//     );
//   }

//   return _createFormState();
// };

declare let window: any;

interface RealizationModalProps {
  onClose: Function;
}

interface Iresponse {
  response: {
    name: string | undefined;
    image: string | undefined;
    description: string | undefined;
    production: boolean;
    edition: number | undefined;
  };
  onClose: Function;
  ethUSD: number;
  exchange: number;
}

export default function SellModal({ response, onClose }: Iresponse) {
  const [isOpen, setIsOpen] = useState(true);
  // console.log(response);
  // const [order, setOrder] = useState(defaultOrder);
  // const [enablePrice, setEnablePrice] = useState(false);
  // const [hasAgreedTOS, setHasAgreedTOS] = useState(false);

  // useEffect(() => {
  //   if (!!course) {
  //     setIsOpen(true);
  //     setOrder({
  //       ...defaultOrder,
  //       price: eth.perItem,
  //     });
  //   }
  // }, [course]);
  const closeModal = () => {
    setIsOpen(false);
    // setOrder(defaultOrder);
    // setEnablePrice(false);
    // setHasAgreedTOS(false);
    onClose();
  };

  // const formState = createFormState(order, hasAgreedTOS, isNewPurchase);

  return (
    <Modal isOpen={isOpen}>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="">
            <div className="mt-3 sm:mt-0 sm:text-left">
              <div className="flex justify-between mx-2">
                <div>
                  {" "}
                  <h3
                    className="mb-7 text-lg font-bold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    구매하기
                  </h3>
                </div>

                <div>
                  <button
                    className="flex justify-center items-center py-2 px-4 border-gold rounded-md shadow-sm bg-white text-sm font-bold bg-gradient-to-r from-gold to-lightGold text-white focus:bg-gradient-to-r focus:from-gold focus:to-lightGold focus:text-white"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <div className="mt-1 relative rounded-md flex items-center">
                <div className="">
                  <div className="mb-1">
                    <img
                      src={response.image}
                      className="w-[200px] h-[auto]"
                      alt=""
                    />
                  </div>
                </div>
                <div className="block pl-4">
                  <div className="text-sm font-bold">
                    Edition {response.edition} of Total Edition
                  </div>
                  <div className="text-xs text-textGray pt-4">Product Name</div>
                  {/* <div className="text-xl">{response.name}</div> */}
                  <div className="text-xs text-textGray pt-4">Price</div>
                  <div className="mb-2 flex flex-wrap">
                    <div className="text-[20px] font-semibold flex items-center">
                      <div>
                        <img
                          className="w-5 h-5 object-contain"
                          src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                          alt="ETH"
                        />
                      </div>
                      <div className="ml-1 w-full overflow-hidden text-ellipsis flex items-end">
                        <input type="text" />
                        {/* {response.price?.toFixed(2)}
                        <div className="text-[15px] ml-1 mb-1 font-normal">
                          <span className="text-textGray overflow-hidden text-ellipsis w-full">
                            Eth (₩ {(ethUSD * exchange).toFixed(0)}원)
                          </span>
                        </div> */}
                      </div>
                    </div>
                    <div className="text-[15px] mt-[15px]"></div>
                  </div>
                </div>
              </div>
              <hr className="mt-4 bg-slate-300" />
              <div className="my-2 font-bold">your current balance</div>
              <div className="flex items-center">
                <img
                  className="w-5 h-5 mr-1 object-contain"
                  src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="ETH"
                />
                <div className="text-lg font-bold">
                  {/* {response.balance?.toFixed(2)} */}
                </div>
                <span className="ml-1 text-sm text-textGray">Eth</span>
              </div>
              <div className="text-xs text-red-500"></div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
          <button
            // onClick={onClick}
            className="w-full flex justify-center items-center my-4 py-2 px-4 border-gold rounded-md shadow-sm bg-white text-sm font-bold bg-gradient-to-r from-gold to-lightGold text-white focus:bg-gradient-to-r focus:from-gold focus:to-lightGold focus:text-white"
            // disabled={formState.isDisabled}
            // onClick={() => {
            //   onSubmit(order, course);
            // }}
          >
            Sell
          </button>
        </div>
      </div>
    </Modal>
  );
}
