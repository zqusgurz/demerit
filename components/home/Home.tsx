
import { useEffect, useState } from 'react';
import { query, DocumentData, Query, QueryDocumentSnapshot, QuerySnapshot, collection, getDoc, getDocs, getFirestore, limit, orderBy, where, doc } from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';
import { data } from 'autoprefixer';
import { app } from 'firebase-admin';
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

        if (!demeritRef) {
            return;
        }
        const stringPhoneNumber = phoneNumber.toString();
        const trimmedPhoneNumber = stringPhoneNumber.substring(1);
        const q = query(demeritRef, where("핸드폰번호", "==", trimmedPhoneNumber));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot) {
            alert('해당하는 데이터가 없습니다.');
            return;
        }
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
        <section id="home" className="container flex flex-col items-center justify-center h-screen">
            <div className="font-bold " style={{ fontSize: '4vw', marginBottom: '3vw', color: isMobile ? '#FFF' : '#000' }}>미팅놈들 벌점 조회</div>
            <form onSubmit={handleFormSubmit}>
                <div className="form-control">
                    <p style={{ fontSize: 18, marginBottom: '1vw', color: isMobile ? '#FFF' : '#000', textAlign: 'center' }}>아래 입력창에 01012341234와 같은 형식으로 번호 입력 후 조회 버튼을 눌러주세요</p>
                    <label htmlFor="number" style={{ fontSize: 24, marginRight: '2vw', color: isMobile ? '#FFF' : '#000' }}>전화번호 : </label>
                    <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} id="number" style={{ fontSize: 24, border: '2px solid #ccc' }} />
                </div>

                <div className="form-actions" style={{ textAlign: 'center', marginTop: '2vw' }}>
                    <button style={{ fontSize: '1vw', border: '2px solid #ddd', padding: '0.2rem 2rem', backgroundColor: 'eee', color: isMobile ? '#FFF' : '#000' }}>조회</button>
                </div>
            </form>
            {demerit !== null && (
                <div style={{ textAlign: 'center', marginTop: '2vw', fontSize: '2vw', color: isMobile ? '#FFF' : '#000' }}>
                    상벌점 : {demerit}
                </div>
            )}
            {demerit1 !== null && (
                <div style={{ textAlign: 'center', marginTop: '2vw', fontSize: '2vw', color: isMobile ? '#FFF' : '#000' }}>
                    기타 벌점 : {demerit1}
                </div>
            )}
            {demerit2 !== null && (
                <div style={{ textAlign: 'center', marginTop: '2vw', fontSize: '2vw', color: isMobile ? '#FFF' : '#000' }}>
                    파토 벌점 : {demerit2}
                </div>
            )}

        </section>
    );
};


export default Home;