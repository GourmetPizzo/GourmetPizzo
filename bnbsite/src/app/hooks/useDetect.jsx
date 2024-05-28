import { useEffect, useState } from "react";

const useDetect = (Ref1, Ref2, Ref3) => {
  const [Detect, setDetect] = useState({
    observe1: false,
    observe2: false,
    observe3: false,
  });

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.target === Ref1.current) {
          setDetect((prev) => ({ ...prev, observe1: entry.isIntersecting }));
        } else if (entry.target === Ref2.current) {
          setDetect((prev) => ({ ...prev, observe2: entry.isIntersecting }));
        } else if (entry.target === Ref3.current) {
          setDetect((prev) => ({ ...prev, observe3: entry.isIntersecting }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    const refs = [Ref1.current, Ref2.current, Ref3.current];

    refs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // 클린업 함수: 컴포넌트가 언마운트될 때 observer를 해제합니다.
    return () => {
      refs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [Ref1, Ref2, Ref3]);

  return Detect;
};

export default useDetect;
