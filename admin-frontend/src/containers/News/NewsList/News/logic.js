import React, { Component } from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import constants from 'helpers/constants';
import {
  stringToBool,
  validateFields,
  generateRequest,
  checkEmptyString,
} from 'helpers/utility';

import Loader from 'components/utility/loader';
import { NEWS_PATH } from '../../params';

const { Option } = Select;

const defaultProps = {
  match: {},
  form: {},
  news: [],
  assets: [],
  updateNews: null,
  fetchNews: null,
  fetchAssets: null,
  deleteNewsOrRestore: null,
  fetchNewsSources: null,
  fetchNewsSource: null,
  deleteEditableSource: null,
  editNews: null,
  component: null,
};

const propTypes = {
  match: PropTypes.object,
  form: PropTypes.object,
  news: PropTypes.arrayOf(PropTypes.object),
  assets: PropTypes.arrayOf(PropTypes.object),
  updateNews: PropTypes.func,
  fetchNews: PropTypes.func,
  fetchAssets: PropTypes.func,
  deleteNewsOrRestore: PropTypes.func,
  fetchNewsSources: PropTypes.func,
  fetchNewsSource: PropTypes.func,
  deleteEditableSource: PropTypes.func,
  editNews: PropTypes.func,
  component: PropTypes.func,
};


class NewsLogic extends Component {
  constructor(props) {
    super(props);

    this.onSearchAssets = debounce(this.onSearchAssets, 500);
    this.getSource = debounce(this.getSource, 500);

    this.ref = {
      quill: null,
    };

    this.state = {
      isNewNews: false,
      assetsAmount: 20,
      sourceAmount: 20,
      text: '',
      textError: false,
      assetsConfig: [],
      pagination: {
        current: 1,
        pageSize: 1,
        total: 0,
      },
    };
  }

  componentWillMount = async () => {
    await this.getCurrentNews();
    const { news, deleteEditableSource } = this.props;
    const { isNewNews } = this.state;

    if (!isNewNews) {
      const { text, imageUri } = news[0];
      this.setState({ imageUri, text });
    } else {
      deleteEditableSource();
    }

    this.getSelectedAssets();
    this.getSelectedSource();
  };

  componentWillUnmount() {
    const { deleteEditableSource } = this.props;
    deleteEditableSource();
  }

  componentWillReceiveProps = async (nextProps) => {
    const {
      isUpdated,
      images: { imageUri },
      assets,
      newsSources,
    } = nextProps;

    const { history, removeNewsIsUpdatedStatus } = this.props;
    const { imageUri: currentImageUri } = this.state;

    if (isUpdated) {
      history.push(NEWS_PATH);
      removeNewsIsUpdatedStatus();
    }

    if (imageUri && imageUri !== currentImageUri) {
      this.setState({ imageUri });
    }

    this.setSourceOptions(newsSources || []);
    this.setAssetOptions(assets || []);
  };

  setSourceOptions = (newsSources) => {
    const sourceConfig = newsSources.map(source => this.renderOption(source, true));
    this.setState({ sourceConfig });
  };

  setAssetOptions = (assets) => {
    const assetsConfig = assets.map(asset => this.renderOption(asset));
    this.setState({ assetsConfig });
  };

  getSelectedAssets = () => {
    const { news } = this.props;

    if (news && (news.length && news[0].assets)) {
      this.getSelectedAsset(news[0].assets);
    }
  };

  getSelectedSource = () => {
    const { fetchNewsSource, news } = this.props;

    if (news && (news.length && news[0].sourceId)) {
      fetchNewsSource(news[0].sourceId, true);
    }
  };

  getAssets = (searchText) => {
    const { fetchAssets } = this.props;
    const { assetsAmount } = this.state;
    const searchTextOr = {
      title: searchText,
      tickerSymbol: searchText,
    };

    const querystring = generateRequest({
      paginationInfo: {
        current: 1,
        pageSize: assetsAmount || 20,
      },
      sortedInfo: constants.SORT_ASSETS_BY_RANK,
      ...(searchText && { searchTextOr }),
    });

    return fetchAssets(querystring);
  };

  getSource = (searchValue) => {
    const { fetchNewsSources } = this.props;
    const { sourceAmount } = this.state;
    const searchText = checkEmptyString(searchValue);
    const querystring = generateRequest({
      paginationInfo: {
        current: 1,
        pageSize: sourceAmount || 20,
      },
      ...(checkEmptyString(searchText) && {
        searchText: {
          name: searchText,
        },
      }),
    });

    return fetchNewsSources(querystring);
  };

  getSelectedAsset = (assets) => {
    const { fetchAssets } = this.props;
    const paginationInfo = {
      current: 1,
      pageSize: assets.length || 1,
    };

    const assetsId = assets.map(asset => asset.id);
    const querystring = generateRequest({
      filteredInfo: {
        id: { $in: assetsId },
      },
      paginationInfo,
    });

    return fetchAssets(querystring);
  };

  preValidation = async (form) => {
    const { news } = this.props;
    const {
      isNewNews,
      newsId: id,
      isDeleted,
    } = this.state;

    const quillEditor = this.ref.quill.getEditor();
    const text = quillEditor.getText();

    const { validateFieldsAndScroll, setFieldsValue } = form;
    const editableNews = news.find(({ id: newsId }) => newsId === Number(id));
    const error = this.customValidate(text, quillEditor);

    await this.setState({ textError: error });

    validateFieldsAndScroll((err) => {
      const { textError } = this.state;

      if (!err && !textError) {
        setFieldsValue({ isDeleted: null });

        if (isDeleted === undefined) return;

        if (!isNewNews && (editableNews.isDeleted !== !isDeleted)) {
          this.onActiveChange(isDeleted);
        }
      }
    });
  };

  customValidate = (text, quillEditor) => {
    if (this.validateVideo(quillEditor.getContents())) {
      return false;
    }

    if (this.validateImage(quillEditor.getContents())) {
      return false;
    }

    return !text || !text.trim().length;
  }

  validateImage = (content) => {
    const result = content.ops.filter(item => item.insert.image);

    return result.length > 0;
  }

  validateVideo = (content) => {
    const result = content.ops.filter(item => item.insert.video);

    return result.length > 0;
  }

  onSave = async () => {
    const { form, updateNews: update, createNews: create } = this.props;
    const {
      isNewNews: isNew,
      newsId: id,
      text,
      imageUri,
    } = this.state;

    const { validateFieldsAndScroll } = form;
    const additionalFields = {
      imageUri,
      ...(text && { text }),
    };

    await this.preValidation(form);
    const { textError } = this.state;

    if (textError) return;

    validateFields({
      validateFieldsAndScroll,
      additionalFields,
      id,
      isNew,
      create,
      update,
    });
  };

  onChangeImage = (url, field) => {
    this.setState({ [field]: url });
  };

  onChange = (event, itemName) => {
    const { form, editNews } = this.props;
    const { setFieldsValue } = form;
    const value = event.target ? event.target.value : event;

    setFieldsValue({
      [itemName]: stringToBool(value),
    });

    editNews();
  };

  renderOption = (item, source = false) => {
    const {
      id,
      name,
      title,
      tickerSymbol,
    } = item;

    const displeyTitle = source ? name : title;
    const value = tickerSymbol ? `${displeyTitle}, ${tickerSymbol}` : displeyTitle;

    return <Option value={id} key={displeyTitle}>{value}</Option>;
  };

  onSearchAssets = async (value) => {
    const parsedValue = checkEmptyString(value);
    await this.getAssets(parsedValue);
    const { assets } = this.props;
    const assetsConfig = assets.map(asset => this.renderOption(asset));

    this.setState({ assetsConfig });
  };

  onChangeText = (text) => {
    const { quill } = this.ref;
    const quillEditor = quill.getEditor();
    const textWithoutTags = quillEditor.getText();

    const error = this.customValidate(textWithoutTags, quillEditor);
    this.setState({ text, textError: error });
  };

  // eslint-disable-next-line consistent-return
  getCurrentNews = async () => {
    await this.getNewsId();

    const { fetchNews } = this.props;
    const { pagination, newsId, isNewNews } = this.state;

    if (!isNewNews) {
      const filteredInfo = { id: newsId };

      const request = generateRequest({
        paginationInfo: pagination,
        filteredInfo,
      });

      if (newsId) {
        return fetchNews(request);
      }
    }
  };

  getNewsId = async () => {
    const { match: { params: { newsId } } } = this.props;

    if (newsId) {
      await this.setState({ newsId });
    } else {
      await this.setState({ isNewNews: true });
    }
  };

  isLoading = (oneNews, assets) => {
    if (oneNews) {
      const { assets: assetsId } = oneNews;

      if (assetsId) {
        return assets.length === 0;
      }

      return false;
    }

    return true;
  };

  getEditableNews = () => {
    const { news } = this.props;
    const { newsId, isNewNews } = this.state;
    let oneNews = {};

    if (!isNewNews) {
      oneNews = news.find(({ id }) => id === Number(newsId));

      if (oneNews && oneNews.assets) {
        const assetIds = oneNews.assets.map(asset => asset.id);
        oneNews = { ...oneNews, assets: assetIds };
      }
    }

    return oneNews;
  };

  onActiveChange = (value) => {
    const { deleteNewsOrRestore } = this.props;
    const { newsId: id } = this.state;
    const props = [{ id, action: value ? 'restore' : 'soft_delete' }];

    if (id) {
      deleteNewsOrRestore(props, value);
    }
  };

  renderSwitchChange = isDeleted => this.setState({ isDeleted });

  getViewStatus = () => {
    const { match } = this.props;

    return !!match.params.newsId || false;
  }

  getRef = name => (el) => {
    this.ref[name] = el;
  }

  render() {
    const {
      sourceConfig,
      text,
      textError,
      assetsConfig,
      imageUri,
    } = this.state;

    const {
      component,
      form,
      news,
    } = this.props;

    const oneNews = this.getEditableNews();

    const { getFieldDecorator } = form;

    const editProps = {
      editableItem: oneNews,
      onChange: this.onChange,
      getFieldDecorator,
    };

    if (!oneNews) {
      return <Loader />;
    }

    return (
      component({
        ...this.props,
        ...this.state,
        oneNews,
        editProps,
        getSource: this.getSource,
        onChangeText: this.onChangeText,
        onSearchAssets: this.onSearchAssets,
        onChangeImage: this.onChangeImage,
        renderSwitchChange: this.renderSwitchChange,
        onSave: this.onSave,
        getRef: this.getRef,
        sourceConfig,
        text,
        textError,
        assetsConfig,
        imageUri,
        news: news[0],
      })
    );
  }
}

NewsLogic.propTypes = propTypes;
NewsLogic.defaultProps = defaultProps;

export default NewsLogic;
