import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const TestInfoWrapper = styled.div`
    .test-info {
        margin-top: 16px;
        width: 100%;
        &__title {
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            letter-spacing: 0.4px;
            color: ${COLORS.black};
        }
        &__item {
            margin-top: 6px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
        &__items-wrapper {
            margin-top: 12px;
        }
        &__item-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        &__item-data {
            margin-left: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            &_main {
                color: ${COLORS.blueMercury};
            }
            &_second {
                color: ${COLORS.greenMercury};
            }
        }
    }
`;

export default WithDirection(TestInfoWrapper);
