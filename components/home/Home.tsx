import React, { useState, useEffect } from 'react';
import { delay, motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { ROUTES } from '../../constants/routes';
import { useMediaQuery } from 'react-responsive';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { initializeApp, getApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const firebaseConfig = require('../../firebaseConfig.js');

const app = !getApp() ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
export {db}

const Home = () => {
    const isMobile = useMediaQuery({ query: "(max-width : 767px)" });
    const StrokeColor = isMobile ? "Pc" : "Mobile";

    const [phoneNumber, setPhoneNumber] = useState('');
    const [demerit, setDemerit] = useState<number | null>(null);
    const [demerit1, setDemerit1] = useState<number | null>(null);
    const [demerit2, setDemerit2] = useState<number | null>(null);

    // phoneNumber 업데이트 함수
    const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(event.target.value);
    };

    // 조회 함수
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Firestore에서 전화번호 조회(query함수를 이용해서 demeritData컬렉션에서 핸드폰번호필드가 입력받은 phoneNumber이랑 일치하는지 조회함)
        const q = query(collection(db, 'demeritData'), where('핸드폰번호', '==', phoneNumber));
        // getDocs 함수를 이용해서 Firestore에서 데이터를 조회하고, querySnapshot.empty 속성을 이용해 조회된 데이터가 있는지 확인함
        const querySnapshot = await getDocs(q);

        // 조회된 데이터가 없으면 에러 메시지 출력
        if (querySnapshot.empty) {
            alert('해당하는 데이터가 없습니다.');
            return;
        }

        // 조회된 데이터 중 "벌점" 필드 값을 가져와서 상태에 저장
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
            <div className="font-bold " style={{ fontSize: 48, marginBottom: '5vw' }}>미팅놈들 벌점 조회</div>
            <form onSubmit={handleFormSubmit}>
                <div className="form-control">
                    <label htmlFor="number" style={{ fontSize: 24, marginRight: '2vw', color: '#333' }}>전화번호 : </label>
                    <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} id="number" style={{ fontSize: 24, border: '2px solid #ccc' }} />
                </div>

                <div className="form-actions" style={{ textAlign: 'center', marginTop: '2vw' }}>
                    <button style={{ fontSize: 20, border: '2px solid #ddd', padding: '0.2rem 2rem', backgroundColor: 'eee', color: '#333' }}>조회</button>
                </div>
                <div>apikey:{firebaseConfig.apiKey},{firebaseConfig.projectId}, ph+demerit:{phoneNumber}, {demerit}, {'demeritData'}</div>
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