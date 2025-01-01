import {useRef,useState,useEffect} from 'react';
import './App.css';
import Menu from './components/Menu';
function App() {
// *for canvas
    const canvasRef = useRef(null);
    // *2D context
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const[lineWidth, setLineWidth] = useState(5);
    const[lineColor, setLineColor] = useState("black");
    const[lineOpacity, setLineOpacity] = useState(0.1);

    useEffect(() => {
        const canvas =  canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalAlpha = lineOpacity;
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = lineColor;
        contextRef.current = ctx;
    },[lineWidth,lineColor, lineOpacity]);
    const startDrawing = (e) => {
    contextRef.current.beginPath();
    contextRef.current.moveTo(
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY
    );
    setIsDrawing(true);
};
    const stopDrawing = (e) => {
        contextRef.current.closePath();
        setIsDrawing(false);    
};
    const draw = (e) => {
        if(!isDrawing) return;
        contextRef.current.lineTo(
            e.nativeEvent.offsetX,
            e.nativeEvent.offsetY
        );
        contextRef.current.stroke();
};
const clearCanvas = () => {
        
        contextRef.current.clearRect(0, 0, canvasRef.current.width,canvasRef.current.height);
    };
    
  return (
    <>
        <div className="App">
            <h1>Painter App</h1>
            <div className="draw-area">
                <Menu 
                   setLineColor={setLineColor}
                   setLineWidth={setLineWidth}
                   setLineOpacity={setLineOpacity}
                    clearCanvas={clearCanvas}
                />
        
                    <canvas
                    onMouseDown={startDrawing}
                    onMouseUp= {stopDrawing}
                    onMouseMove ={draw}
                    width={"1280px"}
                    height={"720px"}
                    ref={canvasRef}
                     />
            </div>
        </div>
    </>
  )
}

export default App
