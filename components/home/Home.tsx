import React from 'react';
import { delay, motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { ROUTES } from '../../constants/routes';
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
// SVG Line Drawing


const Home = () => {
  const isMobile = useMediaQuery({ query: "(max-width : 767px)" }); // 모바일 화면일 때 조건을 추가해줍니다.
  const isPC = useMediaQuery({ query: "(min-width : 767px)" });

  const StrokeColor = isMobile ? "Pc" : "Mobile";


  const firestore = admin.firestore();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [demerit, setDemerit] = useState(null);

    useEffect(() => {
        async function fetchDemerit() {
            try {
                const querySnapshot = await firestore.collection('demeritData').where('핸드폰번호', '==', phoneNumber).get();
                if (!querySnapshot.empty) {
                    const documentSnapshot = querySnapshot.docs[0];
                    const data = documentSnapshot.data();
                    setDemerit(data.상벌점);
                } else {
                    setDemerit(null);
                }
            } catch (error) {
                console.error(error);
            }
        }

        if (phoneNumber) {
            fetchDemerit();
        }
    }, [phoneNumber]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const numberInput = form.elements.namedItem('number') as HTMLInputElement;
        const number = numberInput.value;
        setPhoneNumber(number);
      }
  const variants = {
    start: { pathLength: 0, fill: isMobile ? "rgba(255, 255, 255, 0)" : "rgba(0, 0, 0, 0)" },
    end: { pathLength: 1, fill: isMobile ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)" }
  };

   return (
        <section id="home" className="container flex flex-col items-center justify-center h-screen">
            <div className="font-bold " style={{ fontSize: 48, marginBottom: '5vw' }}>미팅놈들 벌점 조회</div>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="number" style={{ fontSize: 24, marginRight: '2vw', color: '#333' }}>전화번호 : </label>
                    <input type="text" id="number" style={{ fontSize: 24, border: '2px solid #ccc' }} />
                </div>

                <div className="form-actions" style={{ textAlign: 'center', marginTop: '2vw' }}>
                    <button style={{ fontSize: 20, border: '2px solid #ddd', padding: '0.2rem 2rem', backgroundColor: 'eee', color: '#333' }}>조회</button>
                </div>
            </form>
            {demerit !== null && (
                <div style={{ textAlign: 'center', marginTop: '2vw', fontSize: 30, color: '#333' }}>
                    현재 벌점 : {demerit}
                </div>
            )}

        </section>
    );

//   return (
//     <section id="home" className="container flex flex-col items-center justify-center h-screen">

//       <div className="App">
//         <div className="img" style={{ width: "30vw", height: "12vw" }}>
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 174.98 74.04" stroke={isMobile ? "rgba(255, 255, 255)" : "rgba(0, 0, 0)"} fill='none'>
//             <motion.path
//               variants={variants}
//               initial="start"
//               animate="end"
//               transition={{
//                 default: { duration: 3 },
//                 fill: { duration: 1, delay: 1.1 }
//               }}

//               d="M87.89,17.72,72.32,58.5Q67.15,72,57,72a18.86,18.86,0,0,1-5.94-.81v-8a9.54,9.54,0,0,0,4.57,1.12c2.93,0,5-1.5,6.29-4.5l2.25-5.27L49.32,17.72H60.19L68,41.94c.23.77.55,2.22,1,4.33h.14a28.42,28.42,0,0,1,1-4.26l8-24.29Z
// M126.56,54.67h-9.77V49h-.18q-4.08,6.62-11.32,6.61-13,0-13-15.61V17.72h9.81V39q0,9,7,9a7,7,0,0,0,5.55-2.45,9.56,9.56,0,0,0,2.15-6.55V17.72h9.77Z
// M171.91,54.67H159.79L146.67,36.49h-.1V54.67h-9.81V0h9.81V34.77h.1L159,17.72h11.85L156.48,35.23Z M43,54.67H33V32.87H10v21.8H0V2.92H10V24.19H33V2.92H43Z, M171.91,54.67H159.79L146.67,36.49h-.1V54.67h-9.81V0h9.81V34.77h.1L159,17.72h11.85L156.48,35.23Z"

//             />
//           </svg>
//         </div>
//       </div>

//       <motion.div
//         initial={{ opacity: 1 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 2 }}
//         className="flex flex-col items-center mt-10"
//       >

//         <motion.h3
//           variants={textReveal}
//           initial={{ visibility: 'hidden', opacity: 0 }}
//           animate={{ visibility: 'visible', opacity: 1 }}
//           transition={{ ...transition, delay: 2 }}
//           className="text-base md:text-xl"
//         >
//           <div>
//             <span className="font-bold">풀스택</span> 개발자
//             <p style={{ opacity: 0, visibility: "hidden", margin: 0, display: "none" }}>{StrokeColor}</p>
//           </div>

//         </motion.h3>


//         <motion.h2
//           variants={textReveal}
//           initial={{ visibility: 'hidden', opacity: 0 }}
//           animate={{ visibility: 'visible', opacity: 1 }}
//           transition={{ ...transition, delay: 2.4 }}
//           className="text-xl md:text-2xl">
//           <span className="font-bold">변혁</span>입니다
//         </motion.h2>
//       </motion.div>
//     </section>
//   );
};

export default Home;
