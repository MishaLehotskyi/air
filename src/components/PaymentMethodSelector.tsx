'use client'
import {useEffect, useState} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

type CardForm = {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
};

export default function PaymentMethodSelector() {
  const [method, setMethod] = useState<'card' | 'gpay'>('card');

  const activeBox = 'bg-purple-100';
  const inactiveBox = 'bg-white';
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CardForm>({ mode: 'onChange' });

  const onSubmit = (data: CardForm) => {
    console.log('Submitted:', data);
  };

  const expiryRaw = watch('expiry');
  useEffect(() => {
    if (!expiryRaw) return;

    const raw = expiryRaw.replace(/[^\d]/g, '').slice(0, 4);
    let formatted = raw;

    if (raw.length >= 3) {
      formatted = raw.slice(0, 2) + '/' + raw.slice(2);
    }

    // Avoid infinite loop
    if (formatted !== expiryRaw) {
      setValue('expiry', formatted);
    }
  }, [expiryRaw, setValue]);

  const cvvRaw = watch('cvv');

  useEffect(() => {
    if (!cvvRaw) return;

    const numeric = cvvRaw.replace(/[^\d]/g, '').slice(0, 4); // Only allow 0–9, max 4 digits

    if (numeric !== cvvRaw) {
      setValue('cvv', numeric);
    }
  }, [cvvRaw, setValue]);

  return (
    <div className={"bg-white rounded-[16px] p-[16px] my-[8px]"}>
      <h2 className="text-[22px] text-[rgb(73,66,82)] font-bold leading-[32px] mb-[16px]">Payment method selection</h2>

      <div className={"flex flex-col gap-[16px]"} >
      {/* Card */}
      <div
        className={`py-[8px] h-[64px] px-[16px] hover:bg-purple-200 transition duration-[0.3s] rounded-xl cursor-pointer flex items-center ${method === 'card' ? activeBox : inactiveBox}`}
        onClick={() => setMethod('card')}
      >
        <label className="flex items-center gap-[13px] cursor-pointer">
          <input
            type="radio"
            name="payment"
            className="accent-purple-800 h-[20px] w-[20px]"
            checked={method === 'card'}
            onChange={() => setMethod('card')}
          />
          <span className="text-sm font-bold text-[rgb(73,66,82)] mr-[16px]">Card</span>
        </label>
        <div className="flex items-center">
          <Image src="/Mastercard-logo.png" alt="Mastercard" width={32} height={32} />
          <Image className={"ml-3"} src="/Maestro-logo.png" alt="Maestro" width={32} height={32} />
          <Image src="/Visa-logo.png" alt="Visa" width={60} height={40} />
        </div>
      </div>

      {/* Animated card details form */}
      <AnimatePresence initial={false}>
        {method === 'card' && (
          <motion.div
            key="card-form"
            initial={{height: 0, opacity: 0}}
            animate={{height: 'auto', opacity: 1}}
            exit={{height: 0, opacity: 0}}
            transition={{duration: 0.3}}
            className="overflow-hidden"
          >
            <div className="p-[20px] bg-[rgb(245,247,249)] rounded-[16px]">
              <p className="text-[16px] leading-[24px] font-semibold text-[rgb(73,66,82)] mb-[18px]">Please enter your card
                details</p>
              <form className={"space-y-3"} >
                <div>
                  <input
                    type="text"
                    placeholder="Card number"
                    {...register('number', {required: true})}
                    className={`bg-white outline-none h-[52px] px-[10px] rounded-[8px] w-full border focus:border-purple-600 ${
                      errors.number ? 'border-red-500' : 'border-white'
                    }`}
                  />
                  {errors.number && <p className="text-[rgb(196,8,68)] text-[12px] leading-[12px] px-[12px] pt-[6px]">Required to fill.</p>}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Name on card"
                    {...register('name', {required: true})}
                    className={`bg-white outline-none h-[52px] px-[10px] rounded-[8px] w-full border ${
                      errors.name ? 'border-red-500' : 'border-white'
                    }`}
                  />
                  {errors.name && <p className="text-[rgb(196,8,68)] text-[12px] leading-[12px] px-[12px] pt-[6px]">Required to fill.</p>}
                </div>

                <div className="flex justify-between gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      {...register('expiry', {
                        required: true,
                        pattern: /^\d{2}\/\d{2}$/,
                      })}
                      className={`bg-white outline-none h-[52px] px-[10px] rounded-[8px] w-[120px] border ${
                        errors.expiry ? 'border-red-500' : 'border-white'
                      }`}
                    />
                    {errors.expiry && <p className="text-[rgb(196,8,68)] text-[12px] leading-[12px] px-[12px] pt-[6px]">Required to fill.</p>}
                  </div>

                  <div>
                    <input
                      type="password"
                      placeholder="CVV/CVC"
                      {...register('cvv', {
                        required: true,
                        pattern: /^[0-9]{3,4}$/,
                      })}
                      className={`bg-white outline-none h-[52px] px-[10px] rounded-[8px] w-[120px] border ${
                        errors.cvv ? 'border-red-500' : 'border-white'
                      }`}
                    />
                    {errors.cvv && <p className="text-[rgb(196,8,68)] text-[12px] leading-[12px] px-[12px] pt-[6px] w-[120px]">Incorrect CVC/CVV code.</p>}
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Google Pay */}
      <div
        className={`py-[8px] h-[64px] px-[16px] hover:bg-purple-200 transition duration-[0.3s] rounded-xl cursor-pointer flex items-center justify-between ${method === 'gpay' ? activeBox : inactiveBox}`}
        onClick={() => setMethod('gpay')}
      >
        <label className="flex items-center gap-[13px] cursor-pointer">
          <input
            type="radio"
            name="payment"
            className="accent-purple-800 h-[20px] w-[20px]"
            checked={method === 'gpay'}
            onChange={() => setMethod('gpay')}
          />
          <span className="text-sm font-bold text-[rgb(73,66,82)]">Google Pay</span>
          <Image src="/Gpay-logo.png" alt="Gpay" width={60} height={40} />
        </label>
      </div>
      </div>
    </div>
  );
}
