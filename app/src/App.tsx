import { useEffect, useRef, useState } from 'react';

export default function App() {
  const textRef = useRef<HTMLInputElement>(null);
  const [allUrls, setAllurls] = useState([]);

  function copyTextToClipboard(text: string) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  }

  function onCopyBtnClick() {
    document.getElementById('default-message')?.classList.add('hidden');
    document.getElementById('success-message')?.classList.remove('hidden');
    document.getElementById('success-message')?.classList.add('inline-flex');

    copyTextToClipboard(textRef.current!.value);

    setTimeout(() => {
      document.getElementById('default-message')?.classList.remove('hidden');
      document.getElementById('success-message')?.classList.add('hidden');
      document
        .getElementById('success-message')
        ?.classList.remove('inline-flex');
    }, 1000);
  }

  function onShortenBtnClick() {
    console.log('clicked');
  }

  useEffect(() => {
    (async () => {
      const res = await fetch('http://localhost:8000/all');
      const data = await res.json();
      setAllurls(data.urls);
    })();
  }, []);

  console.log(allUrls);

  return (
    <div className='container mx-4 my-12 sm:mx-auto sm:w-1/2'>
      <h1 className='p-4 text-center text-4xl font-extrabold'>Shortly</h1>
      <div>
        <label htmlFor='url' className='mb-1 block text-sm font-medium'>
          Enter URL
        </label>
        <div className='flex w-full flex-col items-center justify-between gap-4 sm:flex-row'>
          <input
            type='text'
            id='url'
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm'
            placeholder='Enter URL here'
            autoComplete='off'
            required
          />
          <button
            type='button'
            className='rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
            onClick={() => onShortenBtnClick()}
          >
            Shorten
          </button>
        </div>
      </div>
      <div className='my-4 grid w-full max-w-[23rem] grid-cols-8 gap-2'>
        <label htmlFor='copy-text' className='sr-only'>
          Label
        </label>
        <input
          id='copy-text'
          type='text'
          className='col-span-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500'
          value='link'
          disabled
          ref={textRef}
          readOnly
        />
        <button
          data-copy-to-clipboard-target='copy-text'
          className='col-span-2 inline-flex w-full items-center justify-center rounded-lg bg-blue-700 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto'
          onClick={() => onCopyBtnClick()}
        >
          <span id='default-message'>Copy</span>
          <span id='success-message' className='hidden items-center'>
            <svg
              className='me-1.5 h-3 w-3 text-white'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 16 12'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M1 5.917 5.724 10.5 15 1.5'
              />
            </svg>
            Copied!
          </span>
        </button>
      </div>
      <div>
        {allUrls.length == 0
          ? null
          : allUrls.map((el, idx) => {
              return (
                <a
                  key={idx}
                  className='block text-blue-600'
                  href={`${window.location.host}/${el['shortUrlId']}`}
                >{`${window.location.host}/${el['shortUrlId']}`}</a>
              );
            })}
      </div>
    </div>
  );
}
