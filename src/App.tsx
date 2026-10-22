import { useState } from 'react'
import { isAddress } from 'viem';
import Blockies from 'react-blockies';

const BlockiesComponent = (
  Blockies as unknown as { default: typeof Blockies }
).default;

export default function App() {
  const [inputVal, setInputVal] = useState('');
  const [downloadError, setDownloadError] = useState('');
  const isValid = isAddress(inputVal);

  const handleBlockiesContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    const canvas = event.currentTarget.querySelector('canvas');
    if (!canvas) {
      setDownloadError('画像を取得できませんでした。もう一度お試しください。');
      return;
    }

    const link = document.createElement('a');
    link.download = `${inputVal}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setDownloadError('');
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#1a1a1a', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ marginBottom: '24px' }}>Blockies Viewer 🎨</h1>

      <input
        type="text"
        placeholder="0x..."
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
        style={{
          width: '420px',
          padding: '12px 16px',
          borderRadius: '8px',
          border: isValid ? '2px solid #4CAF50' : inputVal ? '2px solid #f44336' : '2px solid #555',
          backgroundColor: '#2a2a2a',
          color: '#fff',
          fontSize: '16px',
          outline: 'none',
          marginBottom: '32px',
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        {isValid ? (
          <>
            <div
              style={{
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex',
                lineHeight: 0,
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                imageRendering: 'pixelated',
              }}
              onContextMenu={handleBlockiesContextMenu}
            >
              <BlockiesComponent
                seed={inputVal.toLowerCase()}
                size={8}
                scale={32}
              />
            </div>
            <p style={{ color: '#aaa', fontSize: '14px' }}>画像を右クリックすると、アドレス.pngとして保存できます</p>
            {downloadError && <p role="alert" style={{ color: '#f44336', fontSize: '14px' }}>{downloadError}</p>}
          </>
        ) : (
          <div
            style={{
              width: '256px',
              height: '256px',
              borderRadius: '50%',
              backgroundColor: '#2a2a2a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
              border: '2px dashed #444'
            }}
          >
            有効なアドレスを入力
          </div>
        )}
      </div>
    </div>
  );
}