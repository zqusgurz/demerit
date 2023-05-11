
import { useEffect, useState } from 'react';
import { query, DocumentData, Query, QueryDocumentSnapshot, QuerySnapshot, collection, getDoc, getDocs, getFirestore, limit, orderBy, where, doc } from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';
import { data } from 'autoprefixer';
import { app } from 'firebase-admin';
import { db } from '../../firebaseConfig';
import { motion } from 'framer-motion';


const Home = () => {
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
            <div className="font-bold " style={{ fontSize: 48, marginBottom: '3vw' }}>미팅놈들 벌점 조회</div>
            <form onSubmit={handleFormSubmit}>
                <div className="form-control">
                    <p style={{ fontSize: 16, marginBottom: '1vw', color: '#111', textAlign: 'center' }}>아래 입력창에 01012341234와 같이 번호 입력 후 조회 버튼을 눌러주세요</p>
                    <label htmlFor="number" style={{ fontSize: 24, marginRight: '2vw', color: '#333' }}>전화번호 : </label>
                    <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} id="number" style={{ fontSize: 24, border: '2px solid #ccc' }} />
                </div>

                <div className="form-actions" style={{ textAlign: 'center', marginTop: '2vw' }}>
                    <button style={{ fontSize: 20, border: '2px solid #ddd', padding: '0.2rem 2rem', backgroundColor: 'eee', color: '#333' }}>조회</button>
                </div>
            </form>
            {demerit !== null && (
                <div style={{ textAlign: 'center', marginTop: '2vw', fontSize: 30, color: '#333' }}>
                    상벌점 : {demerit}
                </div>
            )}
            {demerit1 !== null && (
                <div style={{ textAlign: 'center', marginTop: '2vw', fontSize: 30, color: '#333' }}>
                    기타 벌점 : {demerit1}
                </div>
            )}
            {demerit2 !== null && (
                <div style={{ textAlign: 'center', marginTop: '2vw', fontSize: 30, color: '#333' }}>
                    파토 벌점 : {demerit2}
                </div>
            )}

        </section>
    );
};


export default Home;