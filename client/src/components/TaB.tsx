import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import PersonIcon from '@material-ui/icons/Person';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

function TaB() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  let value = 0;
  if (location.pathname.includes('profile')) {
    value = 1;
  } else if (location.pathname.includes('document')) {
    value = 2;
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    switch (newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate(`/profile/${id}`);
        break;
      case 2:
        navigate(`/document/${id}`);
        break;
      default:
        break;
    }
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="icon label tabs example"
      TabIndicatorProps={{ style: { backgroundColor: 'blue' } }}
    >
      <Tab icon={<ArrowBackIos />} label="BACK" />
      <Tab icon={<PersonIcon />} label="PROFILE" />
      <Tab icon={<CloudUploadIcon />} label="DOCUMENTS" />
    </Tabs>
  );
}

export default TaB;
