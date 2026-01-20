'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function RequestAccessModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsOpen(false);
    setFormData({ name: '', location: '', message: '' });
  };

  return (
    <>
      {/* Fixed Trigger Button */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 px-6 py-3 bg-transparent border border-[#C5A059] text-[#C5A059] text-xs tracking-[0.3em] uppercase hover:bg-[#C5A059] hover:text-[#111111] transition-all duration-500"
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Inquiry
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[100] bg-[#111111]/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              className="fixed inset-0 z-[101] flex items-center justify-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-full max-w-lg bg-[#111111] border border-[#222222] p-12"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  className="absolute top-6 right-6 text-[#666666] hover:text-[#EAEAEA] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="mb-10">
                  <h3 className="font-[family-name:var(--font-cormorant)] text-[#EAEAEA] text-3xl font-light italic tracking-wide">
                    Request Access
                  </h3>
                  <motion.div
                    className="mt-4 h-[1px] bg-[#C5A059]"
                    initial={{ width: 0 }}
                    animate={{ width: 60 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                  <p className="mt-4 text-[#666666] text-xs tracking-[0.15em] leading-relaxed">
                    프라이빗 컨설팅을 위한 신청서입니다.
                    <br />
                    담당자가 48시간 내에 연락드립니다.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-[#666666] text-xs tracking-[0.2em] uppercase mb-2">
                      Client Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-[#333333] focus:border-[#C5A059] text-[#EAEAEA] py-3 outline-none transition-colors text-sm"
                      placeholder="홍길동"
                      required
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-[#666666] text-xs tracking-[0.2em] uppercase mb-2">
                      Site Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-[#333333] focus:border-[#C5A059] text-[#EAEAEA] py-3 outline-none transition-colors text-sm"
                      placeholder="서울특별시 강남구"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[#666666] text-xs tracking-[0.2em] uppercase mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-[#333333] focus:border-[#C5A059] text-[#EAEAEA] py-3 outline-none transition-colors text-sm resize-none"
                      rows={3}
                      placeholder="프로젝트에 대해 간략히 알려주세요"
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    className="w-full mt-8 py-4 bg-transparent border border-[#C5A059] text-[#C5A059] text-xs tracking-[0.3em] uppercase hover:bg-[#C5A059] hover:text-[#111111] transition-all duration-500"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    Submit Application
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
