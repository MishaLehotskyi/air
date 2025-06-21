'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

type CardForm = {
  number: string;
  expiry: string;
  cvv: string;
};

type Props = {
  register: UseFormRegister<CardForm>;
  setValue: UseFormSetValue<CardForm>;
  watch: UseFormWatch<CardForm>;
  errors: FieldErrors<CardForm>;
};

export default function PaymentMethodSelector({
  register,
  setValue,
  watch,
  errors,
}: Props) {
  const [method, setMethod] = useState<'card' | 'gpay' | null>(null);

  const numberRaw = watch('number');
  useEffect(() => {
    if (!numberRaw) return;
    const numeric = numberRaw.replace(/[^\d]/g, '').slice(0, 16);
    if (numeric !== numberRaw) setValue('number', numeric);
  }, [numberRaw, setValue]);

  const expiryRaw = watch('expiry');
  useEffect(() => {
    if (!expiryRaw) return;
    const raw = expiryRaw.replace(/[^\d]/g, '').slice(0, 4);
    let formatted = raw;
    if (raw.length >= 3) {
      formatted = raw.slice(0, 2) + '/' + raw.slice(2);
    }
    if (formatted !== expiryRaw) setValue('expiry', formatted);
  }, [expiryRaw, setValue]);

  const cvvRaw = watch('cvv');
  useEffect(() => {
    if (!cvvRaw) return;
    const numeric = cvvRaw.replace(/[^\d]/g, '').slice(0, 4);
    if (numeric !== cvvRaw) setValue('cvv', numeric);
  }, [cvvRaw, setValue]);

  const activeBox = 'bg-purple-100';
  const inactiveBox = 'bg-white';

  return (
    <div className="bg-white rounded-[16px] p-[16px] my-[8px]">
      <h2 className="text-[22px] text-[rgb(73,66,82)] font-bold leading-[32px] mb-[16px]">
        Payment method selection
      </h2>

      <div className="flex flex-col gap-[16px]">
        {/* Card Option */}
        <div
          className={`py-[8px] h-[64px] px-[16px] hover:bg-purple-200 transition duration-[0.3s] rounded-xl cursor-pointer flex items-center ${
            method === 'card' ? activeBox : inactiveBox
          }`}
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
            <Image className="ml-3" src="/Maestro-logo.png" alt="Maestro" width={32} height={32} />
            <Image src="/Visa-logo.png" alt="Visa" width={60} height={40} />
          </div>
        </div>

        <AnimatePresence initial={false}>
          {method === 'card' && (
            <motion.div
              key="card-form"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-[20px] bg-[rgb(245,247,249)] rounded-[16px] space-y-4">
                <p className="text-[16px] leading-[24px] font-semibold text-[rgb(73,66,82)]">
                  Please enter your card details
                </p>

                <div>
                  <input
                    type="text"
                    placeholder="Card number"
                    {...register('number', { required: true })}
                    className={`bg-white outline-none h-[52px] px-[10px] rounded-[8px] w-full border focus:border-purple-600 ${
                      errors.number ? 'border-red-500' : 'border-white'
                    }`}
                  />
                  {errors.number && (
                    <p className="text-[rgb(196,8,68)] text-[12px] px-[12px] pt-[6px]">
                      Required to fill.
                    </p>
                  )}
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
                      className={`bg-white outline-none h-[52px] px-[10px] rounded-[8px] w-[120px] border focus:border-purple-600 ${
                        errors.expiry ? 'border-red-500' : 'border-white'
                      }`}
                    />
                    {errors.expiry && (
                      <p className="text-[rgb(196,8,68)] text-[12px] px-[12px] pt-[6px]">
                        Required to fill.
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      type="password"
                      placeholder="CVV/CVC"
                      {...register('cvv', {
                        required: true,
                        pattern: /^[0-9]{3,4}$/,
                      })}
                      className={`bg-white outline-none h-[52px] px-[10px] rounded-[8px] w-[120px] border focus:border-purple-600 ${
                        errors.cvv ? 'border-red-500' : 'border-white'
                      }`}
                    />
                    {errors.cvv && (
                      <p className="text-[rgb(196,8,68)] text-[12px] px-[12px] pt-[6px] w-[120px]">
                        Incorrect CVC/CVV code.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}