import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { validateUrl } from 'helpers/utility';
import Button from 'components/uielements/button';
import Box from 'components/utility/box';
import LayoutWrapper from 'components/utility/layoutWrapper';
import Form from 'components/uielements/form';
import { RenderInput, RenderSwitch, RenderSelect } from 'components/formElements';
import ImageUploader from 'components/ImageUploader';
import Editor from '../Editor';
import NewsListPageWrapper from './style';
import { NEWS_PATH } from '../../params';

const propTypes = {
  text: PropTypes.string,
  imageUri: PropTypes.string,
  isNewNews: PropTypes.bool,
  textError: PropTypes.bool,
  assetsConfig: PropTypes.array,
  sourceConfig: PropTypes.array,
  oneNews: PropTypes.object,
  editProps: PropTypes.object,
  news: PropTypes.object,
  getSource: PropTypes.func,
  onChangeText: PropTypes.func,
  onSearchAssets: PropTypes.func,
  onChangeImage: PropTypes.func,
  onSave: PropTypes.func,
  renderSwitchChange: PropTypes.func,
  getRef: PropTypes.func,
};

const defaultProps = {
  text: '',
  imageUri: '',
  isNewNews: false,
  textError: false,
  assetsConfig: [],
  sourceConfig: [],
  oneNews: {},
  editProps: {},
  news: {},
  getSource: null,
  onChangeText: null,
  onSearchAssets: null,
  onChangeImage: null,
  onSave: null,
  renderSwitchChange: null,
  getRef: null,
};

const News = ({
  isNewNews,
  news,
  editProps,
  oneNews,
  getSource,
  sourceConfig,
  text,
  textError,
  onChangeText,
  onSearchAssets,
  assetsConfig,
  imageUri,
  onChangeImage,
  onSave,
  renderSwitchChange,
  getRef,
}) => (
  <LayoutWrapper>
    <Box>
      <NewsListPageWrapper className="editView" isNews>
        <div className="PageContent">
          <div className="OrderInfo">
            <div className="LeftSideContent">
              <h3 className="Title">News Info</h3>
              { !isNewNews && news
                && (
                <div>
                  <p>
                    <span className="RegDateLabel">Publication date: </span>
                    <span className="orderDateOrder date">
                      {moment(news.addedAt).format('Do MMMM YYYY / HH:mm')}
                    </span>
                  </p>
                  <p>
                    <span className="RegDateLabel">Moonhub link: </span>
                    <span>
                      <a
                        className="MoonhubLink"
                        href={news.moonhubUri}
                        onClick={(event) => {
                          event.preventDefault();
                          const tab = window.open(news.moonhubUri);
                          tab.focus();
                        }}
                      >
                        {news.moonhubUri}
                      </a>
                    </span>
                  </p>
                </div>
                )
              }
            </div>
            <div className="RightSideContent RightSideContent_active">
              <RenderSwitch
                title="Active"
                itemName="isDeleted"
                onChange={renderSwitchChange}
                isPass={!oneNews.isDeleted || false}
                required={false}
                className="SwitchBox"
              />
            </div>
          </div>
          <Form className="newsForm">
            <div className="NewsInformation">
              <div className="LeftSideContent">
                <RenderInput title="Title" itemName="title" max={255} {...editProps} />
                <RenderInput
                  title="Source link"
                  itemName="uri"
                  max={255}
                  validator={validateUrl}
                  {...editProps}
                  placeholder="Source link (should contain 'http://' or 'https://' protocol)"
                />
                <RenderSelect
                  title="News source"
                  placeholder="Select source"
                  itemName="sourceId"
                  onSearch={getSource}
                  options={sourceConfig || []}
                  message="News source is required"
                  showSearch
                  {...editProps}
                />
              </div>
              <div className="RightSideContent">
                <RenderSelect
                  title="Related assets"
                  itemName="assets"
                  required={false}
                  mode="multiple"
                  onSearch={onSearchAssets}
                  options={assetsConfig || []}
                  {...editProps}
                />
                <div className="ImageWrap">
                  <div className="FormContainer ImageUploader">
                    <div className="ant-form-item-label">
                      <span>Image uri:</span>
                    </div>
                    <ImageUploader
                      src={imageUri}
                      folder="news"
                      sizeValidation={10000000}
                      onChange={url => onChangeImage(url, 'imageUri')}
                    />
                  </div>
                </div>
              </div>
              <div className="FormContainer NewsEditor">
                <Editor
                  value={text}
                  title="News text"
                  isError={textError}
                  errorMessage="News text is required"
                  onChange={onChangeText}
                  setRef={getRef('quill')}
                  isNews
                />
              </div>
            </div>
          </Form>
          <div className="ButtonWrapper" />
        </div>
        <div className="PageHeader">
          <Link to={NEWS_PATH}>
            <Button color="primary">
              <span>Cancel</span>
            </Button>
          </Link>
          <Button type="primary" onClick={onSave} className="saveBtn">
            <span>Save</span>
          </Button>
        </div>
      </NewsListPageWrapper>
    </Box>
  </LayoutWrapper>
);

News.propTypes = propTypes;
News.defaultProps = defaultProps;

export default News;
