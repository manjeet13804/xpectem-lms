import styled from 'styled-components';
import { COLORS } from 'constants/constants';

const AntSlider = ComponentName => styled(ComponentName)`
  .ant-slider {
    &-handle {
      border: 2px solid ${COLORS.black};
      background-color: ${COLORS.black};
    }
    &:hover {
      border-color: ${COLORS.black};
      background-color: black;
      box-shadow: none;
    }
  }
  
  .ant-slider-track{
    background-color: ${COLORS.black} !important;
    border-color: ${COLORS.black};
    &:hover {
      background-color: black;
      border-color: ${COLORS.black};
    }
  }

  .ant-slider-handle.ant-tooltip-open {
    border-color: ${COLORS.black};
  }
  .ant-slider-handle.ant-tooltip-open.ant-slider-handle-click-focused {
    border: none;
    border-color: ${COLORS.black};
    background-color: ${COLORS.black};
  }
  .ant-slider-handle {
    &:focus {
     box-shadow: none;
    }
    &:not(.ant-tooltip-open) {
      border-color: ${COLORS.black};
    }
  }
  .ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open) {
    border-color: ${COLORS.black};
  }
  .ant-slider-mark {
    &:hover {
    background-color: black;
    }
  }
`;


export default AntSlider;
