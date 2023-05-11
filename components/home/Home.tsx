// import React, { useState, useEffect } from 'react';
// import { delay, motion } from 'framer-motion';
// import { Typewriter } from 'react-simple-typewriter';
// import { ROUTES } from '../../constants/routes';
// import { useMediaQuery } from 'react-responsive';
// import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
// import firebase from 'firebase/app';
// import { FirebaseApp } from 'firebase/app';
// import 'firebase/firestore';

// import app from '../../firebaseConfig';


// const Home = () => {
//     const isMobile = useMediaQuery({ query: "(max-width : 767px)" });
//     const StrokeColor = isMobile ? "Pc" : "Mobile";
//     const db = getFirestore(app);
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [demerit, setDemerit] = useState<number | null>(null);
//     const [demerit1, setDemerit1] = useState<number | null>(null);
//     const [demerit2, setDemerit2] = useState<number | null>(null);

//     // phoneNumber 업데이트 함수
//     const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setPhoneNumber(event.target.value);
//     };
//     // 조회 함수
//     const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();

//         // Firestore에서 전화번호 조회(query함수를 이용해서 demeritData컬렉션에서 핸드폰번호필드가 입력받은 phoneNumber이랑 일치하는지 조회함)
//         const q = query(collection(db, 'demeritData'), where('핸드폰번호', '==', phoneNumber));
//         // getDocs 함수를 이용해서 Firestore에서 데이터를 조회하고, querySnapshot.empty 속성을 이용해 조회된 데이터가 있는지 확인함
//         const querySnapshot = await getDocs(q);

//         // 조회된 데이터가 없으면 에러 메시지 출력
//         if (querySnapshot.empty) {
//             alert('해당하는 데이터가 없습니다.');
//             return;
//         }

//         // 조회된 데이터 중 "벌점" 필드 값을 가져와서 상태에 저장
//         let demerit = 0;
//         let demerit1 = 0;
//         let demerit2 = 0;
//         querySnapshot.forEach((doc) => {
//             const data = doc.data();
//             demerit += data.상벌점;
//             demerit1 += data.기타벌점 || 0;
//             demerit2 += data.파토벌점 || 0;
//         });
//         setDemerit(demerit);
//         setDemerit1(demerit1);
//         setDemerit2(demerit2);
//     };

//     return (
//         <section id="home" className="container flex flex-col items-center justify-center h-screen">
//             <div className="font-bold " style={{ fontSize: 48, marginBottom: '5vw' }}>미팅놈들 벌점 조회</div>
//             <form onSubmit={handleFormSubmit}>
//                 <div className="form-control">
//                     <label htmlFor="number" style={{ fontSize: 24, marginRight: '2vw', color: '#333' }}>전화번호 : </label>
//                     <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} id="number" style={{ fontSize: 24, border: '2px solid #ccc' }} />
//                 </div>

//                 <div className="form-actions" style={{ textAlign: 'center', marginTop: '2vw' }}>
//                     <button style={{ fontSize: 20, border: '2px solid #ddd', padding: '0.2rem 2rem', backgroundColor: 'eee', color: '#333' }}>조회</button>
//                 </div>
//                 <div>ph+demerit:{phoneNumber}, {demerit}, {'demeritData'}, {db.app.options.apiKey}</div>
//             </form>
//             {demerit !== null && (
//                 <div style={{ textAlign: 'center', marginTop: '2vw', fontSize: 30, color: '#333' }}>
//                     상벌점 : {demerit}
//                 </div>
//             )}
//             {demerit1 !== null && (
//                 <div style={{ textAlign: 'center', marginTop: '2vw', fontSize: 30, color: '#333' }}>
//                     기타 벌점 : {demerit1}
//                 </div>
//             )}
//             {demerit2 !== null && (
//                 <div style={{ textAlign: 'center', marginTop: '2vw', fontSize: 30, color: '#333' }}>
//                     파토 벌점 : {demerit2}
//                 </div>
//             )}

//         </section>
//     );

// };

// export default Home;
// Home.tsx 파일
// import { useEffect, useState } from 'react';
// import { query, DocumentData, Query, QueryDocumentSnapshot, QuerySnapshot, collection, getDoc, getDocs, getFirestore, limit, orderBy, where, doc } from 'firebase/firestore/lite';
// import { initializeApp } from 'firebase/app';
// // import {getDatabase, ref, onValue} from 'firebase/database-compat';
// import { data } from 'autoprefixer';
// import { app } from 'firebase-admin';
// // import firebaseConfig from '../../firebaseConfig';
// import { db } from '../../firebaseConfig';

// const Home = () => {
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [demerit, setDemerit] = useState<number | null>(null);
//     const [demerit1, setDemerit1] = useState<number | null>(null);
//     const [demerit2, setDemerit2] = useState<number | null>(null);

//     // phoneNumber 업데이트 함수
//     const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setPhoneNumber(event.target.value);
//     };

//     const demeritRef = db ? collection(db, "demeritData") : null;
//     alert("demeritRef"+db?.app.name)
//     // 조회 함수
//     const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();



//         if (!demeritRef) {
//             return;
//         }
//         alert("조회 잘 됨2" + demeritRef.id) // [dameritData]
//         const q = query(demeritRef, where("이름", "==", phoneNumber));
//         alert("조회 잘 됨3"+query.name+q.firestore.app.name+db?.app.name) // q.firestore.app.name == [DEFAULT], query.name = Er
//         //getDocs 함수를 이용해서 Firestore에서 데이터를 조회하고, querySnapshot.empty 속성을 이용해 조회된 데이터가 있는지 확인함
//         const querySnapshot = await getDocs(q);
//         alert("조회 잘 됨4")
//         if (!querySnapshot) {
//             alert('해당하는 데이터가 없습니다.');
//             return;
//           }
//           alert("조회 잘 됨5")
//         // 조회된 데이터가 없으면 에러 메시지 출력
//         if (querySnapshot.empty) {
//             alert('해당하는 데이터가 없습니다.');
//             return;
//         }

//         // 조회된 데이터 중 "벌점" 필드 값을 가져와서 상태에 저장
//         let demerit = 0;
//         let demerit1 = 0;
//         let demerit2 = 0;
//         querySnapshot.forEach((doc) => {
//             const data = doc.data();
//             demerit += data.상벌점;
//             demerit1 += data.기타벌점 || 0;
//             demerit2 += data.파토벌점 || 0;
//         });
//         setDemerit(demerit);
//         setDemerit1(demerit1);
//         setDemerit2(demerit2);
//     };
import { useEffect, useState } from 'react';
import { query, DocumentData, Query, QueryDocumentSnapshot, QuerySnapshot, collection, getDoc, getDocs, getFirestore, limit, orderBy, where, doc } from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';
// import {getDatabase, ref, onValue} from 'firebase/database-compat';
import { data } from 'autoprefixer';
import { app } from 'firebase-admin';
// import firebaseConfig from '../../firebaseConfig';
import { db } from '../../firebaseConfig';

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
        //alert("조회 잘 됨2" + demeritRef.id) // [dameritData]
        const stringPhoneNumber = phoneNumber.toString();
        const trimmedPhoneNumber = stringPhoneNumber.substring(1);
        const q = query(demeritRef, where("핸드폰번호", "==", trimmedPhoneNumber));
        //alert("조회 잘 됨3"+query.name+q.firestore.app.name+db?.app.name+db?.app.options.apiKey) // q.firestore.app.name == [DEFAULT], query.name = Er
        //getDocs 함수를 이용해서 Firestore에서 데이터를 조회하고, querySnapshot.empty 속성을 이용해 조회된 데이터가 있는지 확인함
        const querySnapshot = await getDocs(q);
        //alert("조회 잘 됨4")
        if (!querySnapshot) {
            alert('해당하는 데이터가 없습니다.');
            return;
        }
        //alert("조회 잘 됨5")
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


    // const data = await getDocs(q);
    // const newData = data.docs.map(doc => ({
    //     ...doc.data()
    // }));
    // setDemerit(demerit);


    // phoneNumber 상태값을 이용해서 Firestore에서 데이터 조회
    //const db = getFirestore(initializeApp());

    // const demeritDataRef = collection(db, 'demeritData');
    // const q = query(demeritDataRef, where('핸드폰번호', '==', phoneNumber));       
    // // 조회된 데이터가 없으면 에러 메시지 출력
    // onSnapshot(q, (querySnapshot) => {
    //     if (querySnapshot.empty) {
    //         alert('No matching documents.');
    //     } else {
    //         let demerit = 0;
    //         let demerit1 = 0;
    //         let demerit2 = 0;
    //         querySnapshot.forEach((doc) => {
    //             const data = doc.data();
    //             demerit += data.상벌점;
    //             demerit1 += data.기타벌점 || 0;
    //             demerit2 += data.파토벌점 || 0;
    //         });
    //         setDemerit(demerit);
    //         setDemerit1(demerit1);
    //         setDemerit2(demerit2);
    //     }
    // }, (error) => {
    //     alert('Error getting documents:');
    // });

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
                {/* <div>querysnapshot: ,ph+demerit:{phoneNumber}, demerit: {demerit}, demeritData: {'demeritData'},</div> */}
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