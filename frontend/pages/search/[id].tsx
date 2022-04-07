import { Layout } from "@components/ui/layout";
import type { NextPage } from "next";
import { Listbox, RadioGroup, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useState, Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import useMutation from "@libs/client/useMutation";
import useSWR from "swr";
import { Item } from "@components/ui/common";
import { Nft } from "@components/ui/common/item";
import { useRecoilValue } from "recoil";
import { accessToken } from "@components/atoms/Auth";
import { tokenFetcher } from "@libs/client/useUser";
import RangeSlider from "@components/ui/common/rangebar";
import Pagination from "@mui/material/Pagination";

interface SearchResponse {
  message: string;
  statusCode: number;
  nftDtoList: Nft[];
}

const Search: NextPage = () => {
  const TOKEN = useRecoilValue(accessToken);
  const [sortSelected, setSortSelected] = useState("");
  const [roomSelected, setRoomSelected] = useState("");
  const [selectedPrice, setSelectedPrice] = useState([0, 999999]);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { id } = router.query;

  // 해당 변수들(필터링, 검색키워드, 정렬) 파라미터 적용하여 변화감지할때마다 api 요청
  const { data } = useSWR<SearchResponse>(
    id
      ? [
          `${process.env.BASE_URL}/nft/search?keyword=${id}&max=${selectedPrice[1]}&min=${selectedPrice[0]}&pageNumber=${page}&ownerIsEnterprise=${roomSelected}&sort=${sortSelected}`,
          TOKEN,
        ]
      : null,
    tokenFetcher
  );

  useEffect(() => {
    if (data && data?.statusCode === 404) {
      alert("검색결과가 없습니다.");
    }
  }, [data, router]);

  const handleChangePrice = (event: Event, value: any) => {
    setSelectedPrice(value);
  };

  console.log(page);
  return (
    <Layout seoTitle="검색 결과">
      <div className="flex flex-col  max-w-full mx-10 p-10 items-center ">
        {/* 검색결과 */}
        <div className=" font-[550] text-[36px]">
          <span className="font-[600] text-[40px] bg-clip-text text-transparent bg-gradient-to-r from-gold to-lightGold mr-2">
            {id}
          </span>
          검색 결과
        </div>

        <div className="flex w-full pt-5 flex-row gap-x-4">
          {/* 필터링 */}
          <div className=" w-1/5 flex flex-col pt-2 pb-10 items-center bg-slate-100  gap-y-7 mr-2">
            <div className=" flex flex-col items-center w-5/6">
              <div className="font-semibold  text-lg pb-3 ">판매관</div>
              <div className="flex flex-row justify-between">
                <div className="  mx-auto">
                  <div className="flex space-x-6">
                    <div
                      className={`cursor-pointer btn border-2 p-2 px-3 rounded-md hover:bg-gold ${
                        roomSelected === "false" ? "bg-gold" : null
                      }  `}
                      onClick={() => setRoomSelected("false")}
                    >
                      개인관
                    </div>

                    <div
                      className={`cursor-pointer btn border-2 p-2 px-3 rounded-md hover:bg-gold ${
                        roomSelected === "true" ? "bg-gold" : null
                      }  `}
                      onClick={() => setRoomSelected("true")}
                    >
                      명품관
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-semibold flex flex-col md:flex-row text-lg pb-3">
                <span>가격</span> <span>범위</span>
              </div>
              <RangeSlider
                value={selectedPrice}
                changePrice={handleChangePrice}
              />
            </div>
          </div>
          {/* 오른쪽 */}
          <div className="  w-4/5 flex items-center flex-col bg-slate-100  ">
            {/* 정렬  */}
            <div className=" ml-4  h-16 self-end  mb-16">
              <div className="flex  gap-x-5 gap  transition text-gray-600 duration-200">
                <button
                  className={`font-semibold hover:border-b-2 cursor-pointer  ${
                    sortSelected === "id,desc" ? "border-b-2 border-gold" : null
                  }  `}
                  onClick={() => setSortSelected("id,desc")}
                >
                  최신순
                </button>
                <button
                  className={`font-semibold hover:border-b-2 cursor-pointer  ${
                    sortSelected === "likeCount,desc"
                      ? "border-b-2 border-gold"
                      : null
                  }  `}
                  onClick={() => setSortSelected("likeCount,desc")}
                >
                  인기순
                </button>

                <button
                  className={`font-semibold hover:border-b-2 cursor-pointer  ${
                    sortSelected === "price,asc"
                      ? "border-b-2 border-gold"
                      : null
                  }  `}
                  onClick={() => setSortSelected("price,asc")}
                >
                  낮은 가격순
                </button>

                <button
                  className={`font-semibold hover:border-b-2 cursor-pointer  ${
                    sortSelected === "price,desc"
                      ? "border-b-2 border-gold"
                      : null
                  }  `}
                  onClick={() => setSortSelected("price,desc")}
                >
                  높은 가격순
                </button>
              </div>
            </div>
            {/* 검색 결과 */}
            <div className=" grid h-80 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 px-2 md">
              {data?.nftDtoList.map((nft) => (
                <Item
                  key={nft.nftId}
                  enterprise={nft.enterprise}
                  imgUrl={nft.imgUrl}
                  likeCount={nft.likeCount}
                  nftId={nft.nftId}
                  nftName={nft.nftName}
                  price={nft.price}
                  myLike={nft.myLike}
                />
              ))}
            </div>
            <div className="h-4 mr-10 ">
              <Pagination
                page={page}
                onChange={(e, value) => setPage(value)}
                count={10}
                shape="rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
