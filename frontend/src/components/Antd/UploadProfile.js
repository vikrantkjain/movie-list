import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import { useState } from 'react';
import dotenv from "dotenv";

dotenv.config();

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

const UploadProfile = ({ imageUrl, setImageUrl,name }) => {
    const [loading, setLoading] = useState(false);
    const handleChange = (info) => {
        if (info.file.status === "uploading") {
            setLoading(true);
        } else {
            const { status, response } = info.file;
            if (status === "done") {
                getBase64(info.file.originFileObj, (url) => {
                    setLoading(false);
        
                    setImageUrl(response.data);
                   
                });

            } else if (status === "error") {
                setLoading(false);
                // modalNotification({
                //     type: "error",
                //     message: info?.fileList[0]?.response?.message,
                //     description: `${info.file.name} file upload failed. ${info.file.response.detail}`,
                // });
            }
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> :   <div
                class="uploadDocument_caption d-flex align-items-center justify-center flex-column w-100">
                <em className='icon icon-download' />
                <h6 class="mb-0">Drop an image here</h6> 
            </div>}
            
          
        </div>
    );

   
    return (
        <>
            {/* <Upload
                name="movie"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://localhost:5000/api/media/upload"
                beforeUpload={beforeUpload}
                onChange={handleChange}
            
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                            width: '100%',
                        }}
                    />
                ) : (
                    uploadButton
                )}
            </Upload> */}

            <Upload
                name='file'
                action={process.env.NEXT_PUBLIC_BASE_PATH+'media/upload'}
                onChange={handleChange}
                beforeUpload={beforeUpload}
                showUploadList={false}
            >
                {imageUrl ? (
                  
                    <img
                        src={imageUrl?.baseUrl}
                        alt="avatar"
                        style={{
                            width: '100%',
                        }}
                    />
                ) : (
                    uploadButton
                )}
            </Upload>
        </>
    );
};

export default UploadProfile;