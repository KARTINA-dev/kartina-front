import React from 'react';
import { AiOutlineInbox, AiOutlinePaperClip } from 'react-icons/ai';
import { Slider, Upload } from 'antd';

import { useTranslation } from '@/i18n';
import { useSelector } from '@/store/hooks';
import { InputNumber, InputString, TextArea } from '@/components/Input/Input';
import { ReactComponent as FlowIcon } from '@/assets/icons/flow_12.svg';

import { ManageTabs } from '../../types';

import { useCreateRequest } from './hooks';
import styles from './CreateRequest.module.scss';

interface ICreateRequests {
  setActiveTab: (tab: ManageTabs) => void;
}

export const CreateRequest: React.FC<ICreateRequests> = (props) => {
  const { setActiveTab } = props;

  const { t } = useTranslation();
  const { _id: galleryId } = useSelector((state) => state.gallery);

  const {
    request,
    error,
    next,
    currentIndex,
    currentImage,
    isCompleted,
    getImageUrl,
    createRequest,
    onRequestChange,
    onImageChange,
    onImageBeforeUpload,
  } = useCreateRequest(galleryId);

  const sendRequest = () => {
    createRequest();
    setActiveTab(ManageTabs.Requests);
  };

  return (
    <>
      <p>{t((d) => d.manage.create.description)}</p>
      <div className={styles.create}>
        <div className={styles.createUpload}>
          {currentImage ? (
            <>
              <img
                className={styles.createUploadImage}
                src={getImageUrl(isCompleted ? 0 : currentIndex)}
                alt={'Uploaded image'}
              />
              {isCompleted ? (
                request.images.map(({ name }, index) => (
                  <div key={index} className={styles.createUploadDescription}>
                    <AiOutlinePaperClip className={styles.createUploadIcon} />
                    <span className={styles.createUploadFilename}>{name}</span>
                  </div>
                ))
              ) : (
                <div className={styles.createUploadDescription}>
                  <AiOutlinePaperClip className={styles.createUploadIcon} />
                  <span className={styles.createUploadFilename}>{request.files[currentIndex].name}</span>
                </div>
              )}
            </>
          ) : (
            <Upload.Dragger
              className={styles.createUploadDrag}
              fileList={request.files}
              multiple={true}
              beforeUpload={onImageBeforeUpload}
            >
              <AiOutlineInbox />
              <p className={styles.createUploadDragLabel}>{t((d) => d.manage.upload.label)}</p>
              <p className={styles.createUploadDragHelp}>{t((d) => d.manage.upload.help)}</p>
            </Upload.Dragger>
          )}
        </div>

        <div className={styles.createForm}>
          {currentImage && !isCompleted ? (
            <>
              <h3>{t((d) => d.manage.form.image.label)}</h3>
              {error && <span className={styles.createFormError}>{error}</span>}
              <div className={styles.createFormItem}>
                <span className={styles.createFormItemLabel}>{t((d) => d.manage.form.image.name)}</span>
                <InputString
                  value={currentImage.name}
                  className={styles.createFormItemInput}
                  placeholder={t((d) => d.manage.form.image.name)}
                  onChange={(value) => onImageChange('name', value)}
                />
              </div>
              <div className={styles.createFormItem}>
                <span className={styles.createFormItemLabel}>{t((d) => d.manage.form.image.artist)}</span>
                <InputString
                  value={currentImage.artist}
                  className={styles.createFormItemInput}
                  placeholder={t((d) => d.manage.form.image.artistPlaceholder)}
                  onChange={(value) => onImageChange('artist', value)}
                />
              </div>
              <div className={styles.createFormItem}>
                <span className={styles.createFormItemLabel}>{t((d) => d.manage.form.image.description)}</span>
                <TextArea
                  value={currentImage.description}
                  className={styles.createFormItemInput}
                  placeholder={t((d) => d.manage.form.image.descriptionPlaceholder)}
                  onChange={(value) => onImageChange('description', value)}
                />
              </div>
              <div className={styles.createFormItem}>
                <span className={styles.createFormItemLabel}>{t((d) => d.manage.form.image.price)}</span>
                <Slider
                  className={styles.slider}
                  value={Number(currentImage.price)}
                  onChange={(value) => onImageChange('price', value)}
                  min={0}
                  max={50000}
                  tooltipVisible={false}
                />
                <InputNumber
                  className={styles.createFormItemInput}
                  value={Number(currentImage.price)}
                  prefix={<FlowIcon />}
                  onChange={(value) => onImageChange('price', value)}
                  min={0}
                  max={50000}
                />
              </div>
            </>
          ) : (
            <>
              <h3>{isCompleted ? t((d) => d.manage.form.sendRequest) : t((d) => d.manage.form.createCollection)}</h3>
              {error && <span className={styles.createFormError}>{error}</span>}
              <div className={styles.createFormItem}>
                <span className={styles.createFormItemLabel}>{t((d) => d.manage.form.collection.name)}</span>
                <InputString
                  value={request.name}
                  className={styles.createFormItemInput}
                  placeholder={t((d) => d.manage.form.collection.namePlaceholder)}
                  onChange={(value) => onRequestChange('name', value)}
                />
              </div>
              <div className={styles.createFormItem}>
                <span className={styles.createFormItemLabel}>{t((d) => d.manage.form.collection.description)}</span>
                <TextArea
                  value={request.description}
                  className={styles.createFormItemInput}
                  placeholder={t((d) => d.manage.form.collection.descriptionPlaceholder)}
                  onChange={(value) => onRequestChange('description', value)}
                />
              </div>
            </>
          )}

          <button className={styles.createFormButton} onClick={isCompleted ? sendRequest : next}>
            {t((d) => (isCompleted ? d.manage.form.sendRequest : d.manage.form.next))}
          </button>
        </div>
      </div>
    </>
  );
};
