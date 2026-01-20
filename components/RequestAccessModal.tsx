'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function RequestAccessModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    location: '',
    area: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("신청이 정상적으로 접수되었습니다. 검토 후, 전담 디렉터가 남겨주신 연락처로 직접 연락드립니다.");
        setIsOpen(false);
        setFormData({ name: '', contact: '', location: '', area: '' });
      } else {
        alert("접수 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert("접수 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 px-6 py-3 bg-transparent border border-[#C5A059] text-[#C5A059] text-xs tracking-[0.3em] uppercase hover:bg-[#C5A059] hover:text-[#111111] transition-all duration-500"
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Private Inquiry
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[100] bg-[#111111]/90 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Content */}
            <motion.div
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-full max-w-md bg-[#111111] border border-[#333333] p-8 md:p-12"
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
                <div className="mb-10 text-center md:text-left">
                  <h3 className="font-[family-name:var(--font-cormorant)] text-[#EAEAEA] text-3xl font-light italic tracking-wide">
                    The Invitation
                  </h3>
                  <motion.div
                    className="mt-4 h-[1px] bg-[#C5A059] mx-auto md:mx-0"
                    initial={{ width: 0 }}
                    animate={{ width: 60 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                  <p className="mt-4 text-[#666666] text-xs tracking-[0.1em] leading-relaxed">
                    소수 정예 프로젝트를 위해<br />
                    제한된 인원만 상담을 진행합니다.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name */}
                  <div className="group">
                    <label className="block text-[#666666] text-[10px] tracking-[0.3em] uppercase mb-2 group-focus-within:text-[#C5A059] transition-colors">
                      Client Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-[#333333] focus:border-[#C5A059] text-[#EAEAEA] py-2 outline-none transition-colors text-sm placeholder-[#333333]"
                      placeholder="성함"
                      required
                    />
                  </div>

                  {/* Contact (Phone) */}
                  <div className="group">
                    <label className="block text-[#666666] text-[10px] tracking-[0.3em] uppercase mb-2 group-focus-within:text-[#C5A059] transition-colors">
                      Contact No.
                    </label>
                    <input
                      type="tel"
                      value={formData.contact}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9-]/g, '');
                        if (value.length <= 13) {
                          setFormData({ ...formData, contact: value });
                        }
                      }}
                      className="w-full bg-transparent border-b border-[#333333] focus:border-[#C5A059] text-[#EAEAEA] py-2 outline-none transition-colors text-sm placeholder-[#333333]"
                      placeholder="010-0000-0000"
                      pattern="^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$"
                      required
                    />
                  </div>

                  {/* Location */}
                  <div className="group">
                    <label className="block text-[#666666] text-[10px] tracking-[0.3em] uppercase mb-2 group-focus-within:text-[#C5A059] transition-colors">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-transparent border-b border-[#333333] focus:border-[#C5A059] text-[#EAEAEA] py-2 outline-none transition-colors text-sm placeholder-[#333333]"
                      placeholder="예: 한남동"
                      required
                    />
                  </div>

                  {/* Area */}
                  <div className="group">
                    <label className="block text-[#666666] text-[10px] tracking-[0.3em] uppercase mb-2 group-focus-within:text-[#C5A059] transition-colors">
                      Area
                    </label>
                    <input
                      type="text"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className="w-full bg-transparent border-b border-[#333333] focus:border-[#C5A059] text-[#EAEAEA] py-2 outline-none transition-colors text-sm placeholder-[#333333]"
                      placeholder="예: 50평"
                      required
                    />
                  </div>

                  {/* Consultation Fee Notice */}
                  <div className="mt-8 mb-4 p-4 border border-[#333333] bg-[#1a1a1a]/50">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[#C5A059] text-xs tracking-[0.1em] uppercase">
                        Reservation Fee
                      </span>
                      <span className="text-[#EAEAEA] text-sm font-medium">
                        100,000 KRW
                      </span>
                    </div>
                    <p className="mt-2 text-[#666666] text-[10px] tracking-wide leading-relaxed">
                      * 심도 있는 공간 진단을 위해 유료 상담으로 진행됩니다.<br/>
                      * 계약 체결 시 전액 공제해 드립니다.
                    </p>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isLoading || !formData.name || !formData.contact || !formData.location || !formData.area}
                    className="w-full mt-8 py-4 bg-[#1a1a1a] border border-[#333333] text-[#EAEAEA] text-xs tracking-[0.3em] uppercase hover:bg-[#C5A059] hover:text-[#111111] hover:border-[#C5A059] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1a1a1a] disabled:hover:text-[#EAEAEA] disabled:hover:border-[#333333]"
                    whileHover={isLoading || !formData.name || !formData.contact || !formData.location || !formData.area ? {} : { scale: 1.01 }}
                    whileTap={isLoading || !formData.name || !formData.contact || !formData.location || !formData.area ? {} : { scale: 0.99 }}
                  >
                    {isLoading ? 'Submitting...' : 'Request Consultation'}
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
