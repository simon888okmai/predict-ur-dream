import { useRef, useState } from 'react';
import axios from 'axios';

function App() {
  const textareaRef = useRef(null);
  const [dream, setDream] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePredict = async (e) => {
    e.preventDefault();
    console.log(import.meta.env.VITE_API_URL);
    if (!dream) return alert('กรุณาเล่าความฝันครับ');

    setLoading(true);
    setResult('');

    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        dream: dream
      });
      setResult(response.data.result);
    } catch (error) {
      console.error(error);
      setResult('โอ๊ยย! เจ้าที่แรงผม เข้าทรงไม่ได้ ลองใหม่นะ');
    } finally {
      setLoading(false);
    }
  }

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="font-prompt min-h-screen bg-black flex flex-col items-center justify-center p-8 text-white gap-8">
      <h1 className="text-2xl md:text-4xl font-bold drop-shadow-lg drop-shadow-cyan-500/50 text-center">
        ไหนลองเล่าความฝันมาสิ
      </h1>

      <form onSubmit={handlePredict} className="flex flex-col gap-4 items-center w-full max-w-lg">
        <textarea
          ref={textareaRef}
          onInput={handleInput}
          className="w-full min-h-32 p-4 border border-white rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none overflow-hidden"
          placeholder="กรุณาเล่าความฝัน..."
          value={dream}
          onChange={(e) => setDream(e.target.value)}
        />
        <button
          disabled={loading}
          className={` px-4 py-3 text-lg font-bold border border-white rounded-xl bg-white text-black transition-all duration-300 transform 
            ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cyan-500 hover:border-cyan-500 hover:text-white hover:scale-105 cursor-pointer'}`}
          type="submit"
        >
          {loading ? 'กำลังเข้าทรง...' : 'ทำนาย'}
        </button>
      </form>

      {result && (
        <div className="w-full max-w-lg p-6 border border-cyan-500/50 rounded-xl bg-white/5 backdrop-blur-sm animate-fade-in mt-4">
          <h2 className="text-xl font-bold mb-2 text-cyan-400">คำทำนาย:</h2>
          <p className="text-lg leading-relaxed whitespace-pre-wrap">{result}</p>
        </div>
      )}
    </div>
  )
}

export default App