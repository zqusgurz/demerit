
import { useState } from 'react';
import { query, collection, getDocs, where } from 'firebase/firestore/lite';
import { db } from '../../firebaseConfig';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

const transition = {
    duration: 1.5,
    ease: [0.6, -0.05, 0.01, 0.9],
}

const textReveal = {
    initial: {
        x: "100%",
        opacity: 0,
    },
    animate: {
        x: "0%",
        opacity: 1,
    },
};

const Home = () => {
    const isMobile = useMediaQuery({ query: "(max-width : 767px)" }); // 모바일 화면일 때 조건을 추가해줍니다.
    const StrokeColor = isMobile ? "Pc" : "Mobile";

    const [phoneNumber, setPhoneNumber] = useState('');
    const [demerit, setDemerit] = useState<number | null>(null);
    const [demerit1, setDemerit1] = useState<number | null>(null);
    const [demerit2, setDemerit2] = useState<number | null>(null);

    // phoneNumber 업데이트 함수
    const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value);
    };

    const demeritRef = db ? collection(db, "demeritData") : null;
    // 조회 함수
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      
        // 입력값 검증
        const phoneNumberRegex = /^01([0|1|6|7|8|9])(\d{3}|\d{4})(\d{4})$/;
        if (!phoneNumberRegex.test(phoneNumber)) {
          alert('전화번호를 올바른 형식으로 입력해주세요.');
          return;
        }
      
        // 입력값 정제
        const sanitizedPhoneNumber = phoneNumber.replace(/['";\(\)]/g, '');
      
        // SQL 쿼리 실행
        const demeritRef = collection(db, 'demerits');
        const querySnapshot = await getDocs(query(demeritRef, where('핸드폰번호', '==', sanitizedPhoneNumber)));
        if (querySnapshot.empty) {
          alert('해당하는 데이터가 없습니다.');
          return;
        }
      
        let demerit = 0;
        let demerit1 = 0;
        let demerit2 = 0;
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          demerit += data.상벌점;
          demerit1 += data.기타벌점 || 0;
          demerit2 += data.파토벌점 || 0;
        });
        setDemerit(demerit);
        setDemerit1(demerit1);
        setDemerit2(demerit2);
      };

    return (
        <section id="home" className="container flex flex-col items-center h-screen">
            <motion.div variants={textReveal}
          initial={{ visibility: 'hidden', opacity: 0 }}
          animate={{ visibility: 'visible', opacity: 1 }}
          transition={{ ...transition}}
          className="font-bold " style={{ fontSize: isMobile ? '4vw' : '2vw', marginTop: isMobile ? '20vw' : '5vw', marginBottom: '3vw', color: '#000' }}>미팅놈들 벌점 조회</motion.div>
            <form onSubmit={handleFormSubmit}>
            <motion.div variants={textReveal}
                    initial={{ visibility: 'hidden', opacity: 0 }}
                    animate={{ visibility: 'visible', opacity: 1 }}
                    transition={{ ...transition }} className="form-control"
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <p style={{ fontSize: isMobile ? 16 : 20, marginBottom: '2vw', color: '#000', textAlign: 'center' }}>아래 입력창에 01012341234와 같은 형식으로 번호 입력 후 조회 버튼을 눌러주세요</p>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label htmlFor="number" style={{ fontSize: isMobile ? '3vw' : '2vw', marginRight: '1vw', color: '#000' }}>전화번호 : </label>
                        <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} id="number" style={{ fontSize: isMobile ? '3vw' : '2vw', border: '2px solid #ccc' }} />
                    </div>
                </motion.div>

                <motion.div variants={textReveal}
          initial={{ visibility: 'hidden', opacity: 0 }}
          animate={{ visibility: 'visible', opacity: 1 }}
          transition={{ ...transition}} className="form-actions" style={{ textAlign: 'center', marginTop: '2vw' }}>
                    <button style={{ fontSize: isMobile ? '2vw' : '1vw', border: '2px solid #ddd', padding: '0.2rem 2rem', backgroundColor: 'eee', color: '#000' }}>조회</button>
                </motion.div>
            </form>
            {demerit !== null && (
                <div style={{ textAlign: 'center', marginTop: '2vw', fontSize: isMobile ? '4vw' : '2vw', color: '#000' }}>
                    상벌점 : {demerit}
                </div>
            )}
            {demerit1 !== null && (
                <div style={{ textAlign: 'center', marginTop: '2vw', fontSize: isMobile ? '4vw' : '2vw', color: '#000' }}>
                    기타 벌점 : {demerit1}
                </div>
            )}
            {demerit2 !== null && (
                <div style={{ textAlign: 'center', marginTop: '2vw', fontSize: isMobile ? '4vw' : '2vw', color: '#000' }}>
                    파토 벌점 : {demerit2}
                </div>
                
            )}
            <p style={{ opacity: 0, visibility: "hidden", margin: 0, display: "none" }}>{StrokeColor}</p>

        </section>
    );
};


export default Home;