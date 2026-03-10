import React, { Fragment, useState } from 'react'
import "./App.css"
import axios from 'axios'
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

const App = () => {
  const [code, SetCode] = useState();
  const [review, SetReview] = useState();

  const handleApiReq = async () => {

    const res = await axios.post(`http://localhost:3000/ai/get-response?prompt=${code}`);


    SetReview(res.data);
  }


  return (
    <Fragment>


      <div className="relative z-10 w-full max-w-6xl h-[85vh] bg-[#0a0f18]/80 backdrop-blur-lg border border-cyan-500/40 rounded-3xl shadow-[0_0_40px_rgba(0,255,255,0.15)] flex flex-col md:flex-row overflow-hidden">

        <div className="absolute top-0 left-0 w-32 h-1 bg-gradient-to-r from-cyan-400 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-32 h-1 bg-gradient-to-l from-cyan-400 to-transparent"></div>
        <div className="absolute top-0 left-0 w-1 h-32 bg-gradient-to-b from-cyan-400 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-1 h-32 bg-gradient-to-t from-cyan-400 to-transparent"></div>

        <div className="w-full md:w-1/2 h-full p-6 flex flex-col relative z-20">
          <div className="grow w-full relative rounded-2xl border border-cyan-500/30 overflow-hidden group transition-all duration-300 hover:border-cyan-400/80 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            <div className="absolute inset-0 sci-fi-grid opacity-50 pointer-events-none"></div>

            <textarea
              placeholder="// Paste your code here..."
              className="w-full h-full bg-transparent text-cyan-50 text-lg p-6 outline-none resize-none placeholder:text-cyan-800 relative z-10"
              onChange={(e) => SetCode(e.target.value.toString())}
            ></textarea>
          </div>

          <div className="w-full flex justify-end mt-6">
            <button onClick={handleApiReq} className="btn-glow px-8 py-3 bg-transparent border-2 border-orange-500/80 text-orange-400 font-bold rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center gap-2 cursor-pointer uppercase tracking-widest">
              <span>Submit</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-center justify-center w-4 relative z-20">
          <div className="w-[2px] h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-50 shadow-[0_0_10px_#22d3ee]"></div>
        </div>

        <div className="w-full md:w-1/2 h-full p-6 flex flex-col relative z-20">
          <div className="w-full h-full rounded-2xl border border-cyan-500/30 bg-[#06141f]/50 overflow-hidden relative group transition-all duration-300 hover:border-cyan-400/80 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] flex flex-col">

            <div className="w-full p-3 border-b border-cyan-500/20 bg-cyan-950/30 flex items-center justify-between">
              <span className="text-sm tracking-widest text-cyan-400">AI_REVIEWER_OUTPUT</span>
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></div>
            </div>

            <div className="p-6 h-full overflow-y-auto">
              <p className="text-cyan-200/70 text-lg leading-relaxed">
                <ReactMarkdown
        components={{
          code({ className, children, ...rest }) {
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                PreTag="div"
                language={match[1]}
                style={dark}
                {...rest}
              >
                {children}
              </SyntaxHighlighter>
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {review}
      </ReactMarkdown>
                
              </p>
            </div>
          </div>
        </div>

      </div>
    </Fragment>
  )
}

export default App