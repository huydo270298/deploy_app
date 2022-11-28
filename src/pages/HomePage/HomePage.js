import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import videoApi from '../../api/videoApi';
import { CupIcon, HelpIcon, PlateIcon } from '../../assets/Icons';
import Modal from '../../components/Modal';
import HelpModal from '../components/HelpModal';
import MissionModal from '../components/MissionModal';
import PushModal from '../components/PushModal';
import SpinModal from '../components/SpinModal';
import VideoSection from '../components/Video/VideoSection';
import styles from './HomePage.module.scss';

let cx = classNames.bind(styles);

const HomePage = () => {
  const { t } = useTranslation();

  const [openHelp, setOpenHelp] = useState(false)
  const [openSpin, setOpenSpin] = useState(false)
  const [openPush, setOpenPush] = useState(false)
  const [openMission, setOpenMission] = useState(false)
  const [video, setVideo] = useState([])

  const handleOpenHelpModal = () => {
    setOpenHelp(true)
  }
  const handleCloseHelpModal = () => {
    setOpenHelp(false)
  }
  const handleOpenSpinModal = () => {
    setOpenSpin(true)
  }
  const handleCloseSpinModal = () => {
    setOpenSpin(false)
  }
  const handleOpenPushModal = () => {
    setOpenPush(true)
  }
  const handleClosePushModal = () => {
    setOpenPush(false)
  }

  const handleOpenMissionModal = () => {
    setOpenMission(true)
  }
  const handleCloseMisionModal = () => {
    setOpenMission(false)
  }

  const [idCategory, setIdCategory] = useState()

  // get add video
  useEffect(() => {
    
    videoApi.getCategoryList()
      .then((reponse) => {
        return reponse.data[0]?.id
      })
      .then((id) => {
        setIdCategory(id)
        return videoApi.getCategoryItem(id)
      })
      .then((reponse) => {
        const list = reponse.data.map((item) => {
          return {
            link: item.videoDescription,
            id: item.id,
          }
        })
        setVideo(list);
      })
  }, [])

  const countReward = useRef(null);


  const [num, setNum] = useState(() => {
    return Math.floor(Date.now()/1000)*100 + 100820737304000;
  });
  
  useEffect(() => {
    countReward.current = setInterval(() => {
      setNum((countdown) => countdown + 123 );
    }, 10);

    num > 999999999999999 && clearTimeout(countReward.current);

    return () => {
      clearTimeout(countReward.current);
    }
  }, [num])
  
  return (
    <>
      <div className={cx('wrapper')}>
        <VideoSection video={video} idCategory={idCategory}/>
        <div className={cx('group')}>
          <button type='button' className={cx('btn', 'get_spin')} onClick={handleOpenSpinModal}>{t("GET_MORE")}</button>
          <button type='button' className={cx('btn', 'push')} onClick={handleOpenPushModal} >{t("PUSH_ADS")}</button>
          <button type='button' className={cx('btn', 'add')} onClick={handleOpenMissionModal} >
            +1000
            <PlateIcon className={cx('icon_plate')} />
          </button>
        </div>
        <div className={cx('reward')}>
          <CupIcon className={cx('icon_cup')} />
          <span className={cx('num')}>
            {num} 
          </span>
            USD
          <button className={cx('btn_help')} onClick={handleOpenHelpModal}>
            <HelpIcon className={cx('icon_help')} />
          </button>
        </div>
        {/* <p className={cx('note')}>{t("AS_LOW_AS")}</p> */}
      </div>
      {openHelp &&
        <Modal onChange={handleCloseHelpModal} >
          <HelpModal />
        </Modal>
      }

      {openSpin &&
        <Modal onChange={handleCloseSpinModal} >
          <SpinModal />
        </Modal>
      }

      {openPush &&
        <Modal onChange={handleClosePushModal} >
          <PushModal />
        </Modal>
      }

      {openMission &&
        <Modal onChange={handleCloseMisionModal} >
          <MissionModal />
        </Modal>
      }
    </>
  )

};

export default HomePage;
