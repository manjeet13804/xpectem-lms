import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SketchPicker } from 'react-color';
import sourceActions from 'redux/newsSources/actions';
import directoryActions from 'redux/directories/actions';
import LayoutWrapper from 'components/utility/layoutWrapper';
import Box from 'components/utility/box';
import Form from 'components/uielements/form';
import Button from 'components/uielements/button';
import { Select } from 'antd';
import { RenderInput, RenderSwitch, RenderSelect } from 'components/formElements';
import Loader from 'components/utility/loader';
import constants from 'helpers/constants';
import { stringToBool, validateUrl } from 'helpers/utility';
import ImageCrop from 'components/ImageCrop';
import SinglePageWrapper from './singleSource.style';
import { SOURCES_PATH } from '../params';

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  fetchNewsSource: PropTypes.func.isRequired,
  editableSource: PropTypes.objectOf(PropTypes.any),
};

const defaultProps = {
  editableSource: {},
};

const { fetchDirectories } = directoryActions;

class SingleSource extends Component {
  constructor(props) {
    super(props);
    const {
      match: { params },
      getCategories,
    } = props;
    const { id } = params;

    this.state = {
      isNewSource: !id,
      imageUriError: null,
    };

    getCategories();
  }

  componentWillMount() {
    const { isNewSource } = this.state;
    const { deleteEditableSource } = this.props;

    if (!isNewSource) {
      this.getNewsSource();
    } else {
      deleteEditableSource();
    }
  }

  componentDidUpdate() {
    const { isUpdatedOrCreated, history } = this.props;

    if (isUpdatedOrCreated) {
      history.push({
        pathname: SOURCES_PATH,
      });
    }
  }

  componentWillUnmount() {
    const { resetIsUpdatedOrCreated, deleteEditableSource } = this.props;
    resetIsUpdatedOrCreated();
    deleteEditableSource();
  }

  getNewsSource = () => {
    const { match: { params }, fetchNewsSource } = this.props;
    const { id } = params;
    fetchNewsSource(id);
  }

  onChange = (event, itemName) => {
    const { form, editEditableSource } = this.props;
    const { setFieldsValue, getFieldsValue } = form;
    const value = event.target ? event.target.value : event;

    setFieldsValue({
      [itemName]: stringToBool(value),
    });

    const params = {
      ...getFieldsValue(),
    };

    if (params.isActive && typeof params.isActive === 'string') {
      params.isActive = params.isActive === 'true';
    }

    editEditableSource(params);
  }

  onChangeImage = (url, field) => {
    const { editEditableSource } = this.props;

    if (url) {
      editEditableSource({ [field]: url });
    }
  }

  onChangeColor = ({ hex }) => {
    const { editEditableSource } = this.props;
    editEditableSource({ color: hex });
  }

  onClearCategory = () => {
    const {
      form: {
        setFieldsValue,
      },
      editEditableSource,
    } = this.props;

    setFieldsValue({ sourceCategoryId: null });
    editEditableSource({ sourceCategoryId: null });
  }

  onSave = () => {
    const {
      form: { validateFields },
      createNewsSource,
      updateNewsSource,
      editableSource,
    } = this.props;

    const { isNewSource } = this.state;

    const imageCheck = this.validateImages();

    validateFields((err) => {
      if (!err && imageCheck) {
        if (isNewSource) {
          createNewsSource(editableSource);
        } else {
          updateNewsSource([editableSource], false);
        }
      }
    });
  }

  validateImages() {
    const {
      editableSource: { imageUri },
    } = this.props;

    const { newsSourceErrors } = constants;

    if (!imageUri) {
      this.setState(prevState => ({ ...prevState, imageUriError: newsSourceErrors.imageUri }));
    } else {
      this.setState(prevState => ({ ...prevState, imageUriError: null }));
    }

    return imageUri;
  }

  render() {
    const {
      editableSource,
      form: { getFieldDecorator },
      isNewSourcesLoading,
      categories,
    } = this.props;
    const { isNewSource, imageUriError } = this.state;

    const editProps = {
      editableItem: editableSource,
      onChange: this.onChange,
      getFieldDecorator,
    };

    if (isNewSourcesLoading) {
      return <Loader />;
    }

    return (
      <LayoutWrapper>
        <Box>
          <SinglePageWrapper>
            <div className="PageContent">
              <div className="Information">
                <div className="LeftSideContent">
                  <h3 className="Title">{isNewSource ? 'Create News Source' : 'Edit News Source'}</h3>
                </div>
              </div>
              <Form className="sourceForm">
                <div className="Information">
                  <div className="LeftSideContent">
                    <div className="FormContainer">
                      <RenderInput title="Name" required itemName="name" {...editProps} />
                    </div>
                    <div className="FormContainer">
                      <RenderInput
                        title="Domain"
                        required
                        itemName="domain"
                        max={255}
                        message="Source link is required"
                        {...editProps}
                      />
                    </div>
                    <div className="FormContainer">
                      <RenderInput
                        title="Source link"
                        required
                        itemName="websiteUri"
                        validator={validateUrl}
                        max={255}
                        message="Source link is required"
                        {...editProps}
                        placeholder="Source link (should contain 'http://' or 'https://' protocol)"
                      />
                    </div>
                    <div className="FormContainer">
                      <RenderSelect
                        required={false}
                        title="Category"
                        itemName="sourceCategoryId"
                        onClear={this.onClearCategory}
                        options={categories.map(({ id, name }) => (
                          <Select.Option key={id} value={id}>
                            {name}
                          </Select.Option>
                        ))}
                        {...editProps}
                      />
                    </div>

                    <div className="FormContainer">
                      <Form.Item label="Colour" required className="wideContent">
                        <SketchPicker
                          className="colorPicker"
                          disableAlpha
                          color={editProps.editableItem.color}
                          onChange={this.onChangeColor}
                        />
                      </Form.Item>
                    </div>

                  </div>
                  <div className="RightSideContent">
                    <div className="FormContainer">
                      <Form.Item label="News source image" required>
                        <ImageCrop
                          src={editProps.editableItem.imageUri}
                          error={imageUriError}
                          onImageChange={url => this.onChangeImage(url, 'imageUri')}
                          imageUploader={{
                            type: 'square',
                          }}
                        />
                      </Form.Item>
                    </div>
                    <div className="FormContainer">
                      <RenderSwitch
                        {...editProps}
                        required={false}
                        title="Prioritization"
                        itemClass="SwitchBox"
                        itemName="isPrioritized"
                        isPass={stringToBool(editProps.editableItem.isPrioritized)}
                      />
                      <RenderSwitch
                        {...editProps}
                        required={false}
                        title="Update"
                        itemClass="SwitchBox"
                        itemName="isActive"
                        isPass={stringToBool(editProps.editableItem.isActive)}
                      />
                    </div>
                  </div>
                </div>
              </Form>

              <div className="ButtonWrapper" />
              <div className="PageHeader">
                <Link to={SOURCES_PATH}>
                  <Button color="primary">
                    <span>Cancel</span>
                  </Button>
                </Link>
                <Button type="primary" onClick={this.onSave} className="saveBtn">
                  <span>Save</span>
                </Button>
              </div>
            </div>
          </SinglePageWrapper>
        </Box>
      </LayoutWrapper>
    );
  }
}

const mapStateToProps = ({
  newsSources,
  directories: { directories },
}) => {
  const categories = directories.news_source_categories || [];

  return { ...newsSources, categories };
};

SingleSource.propTypes = propTypes;
SingleSource.defaultProps = defaultProps;

const WrappedSourceForm = Form.create()(SingleSource);
export default connect(mapStateToProps, {
  ...sourceActions,
  getCategories: () => fetchDirectories('pagination=all', 'news_source_categories'),
})(WrappedSourceForm);
