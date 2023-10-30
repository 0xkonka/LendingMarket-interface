import { useEffect, useState } from 'react';
import { useThemeContext } from 'aave-ui-kit';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import staticStyles from './style';

interface VideoContainerProps {
  classes?: string;
  url?: string;
}

export default function VideoContainer({ classes, url }: VideoContainerProps) {
  const [isVideoFloating, setIsVideoFloating] = useState(false);
  const [isVideoFloatingEnabled, setIsVideoFloatingEnabled] = useState(true);
  const location = useLocation();
  const { currentTheme } = useThemeContext();

  useEffect(() => {
    function handleScroll() {
      const element = document.getElementById('migrationVideoContainer');
      if (!element) return;
      const elementBottom = element.getBoundingClientRect().bottom;
      setIsVideoFloatingEnabled(0 < elementBottom);
      if (!isVideoFloatingEnabled) return;
      setIsVideoFloating(0 > elementBottom);
    }

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isVideoFloatingEnabled]);

  useEffect(() => {
    setIsVideoFloating(false);
    setIsVideoFloatingEnabled(false);
  }, [location.search]);

  return (
    <>
      <div id="migrationVideoContainer" className="VideoContainerParent">
        <div
          className={classNames('VideoContainerChild', isVideoFloating && 'VideoContainerFloating')}
        >
          {isVideoFloating && (
            <div
              onClick={() => {
                setIsVideoFloating(false);
                setIsVideoFloatingEnabled(false);
              }}
              className="VideoContainerCloseButton"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 10.5857L16.95 5.63574L18.364 7.04974L13.414 11.9997L18.364 16.9497L16.95 18.3637L12 13.4137L7.04999 18.3637L5.63599 16.9497L10.586 11.9997L5.63599 7.04974L7.04999 5.63574L12 10.5857Z"
                  fill={currentTheme.text.main}
                  fillOpacity="0.9"
                />
              </svg>
              <span>Close</span>
            </div>
          )}
          {url !== undefined && url.length > 0 && (
            <iframe
              className="VideoEmbedContainer"
              width="560"
              height="315"
              src={url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>
        {`
          .VideoContainerParent {
            background: ${currentTheme.interface.mainTable};
            border-color: ${currentTheme.interface.offset1};
          }

          .VideoContainerCloseButton {
            color: ${currentTheme.text.main}CC;
            background: ${currentTheme.interface.offset1}26;
          }

          .VideoContainerCloseButton:hover {
            background: ${currentTheme.interface.offset1};
          }
        `}
      </style>
    </>
  );
}
