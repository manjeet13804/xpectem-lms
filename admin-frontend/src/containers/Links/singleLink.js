import React, { Component } from 'react';
import { Alert } from 'antd';
import Loader from 'components/utility/loader';
import LayoutWrapper from 'components/utility/layoutWrapper';
import Box from 'components/utility/box';
import { generateRequest } from 'helpers/utility';
import Button from 'components/uielements/button';
import constants from 'helpers/constants';
import DeleteModal from 'containers/Feed/DeleteModal';
import LinkForm from './linkForm';
import propTypes from './propTypes';
import defaultProps from './defaultProps';
import SinglePageWrapper from './singleLink.style';

class SingleLink extends Component {
  constructor(props) {
    super(props);
    this.getInitial(props);

    this.state = {
      showDeleteModal: false,
      goingToDelete: false,
      isChanged: false,
      isFormLoading: false,
    };
  }

  componentDidUpdate() {
    this.getRedirect();
  }

  getInitial = (props) => {
    const { editableLinkId, actions, links } = props;
    const { fetchOneLink, fetchLinkGroups } = actions;

    const linkQuerystring = generateRequest({
      filteredInfo: {
        id: { $in: [editableLinkId] },
      },
      paginationInfo: {
        current: 1,
        pageSize: 10,
      },
    });

    const groupsQuerystring = generateRequest({
      paginationInfo: {
        current: 1,
        pageSize: 20,
      },
    });

    fetchLinkGroups(groupsQuerystring);

    if (!this.isNew()) {
      fetchOneLink(linkQuerystring, editableLinkId, links);
    }
  };

  getRedirect = () => {
    const { isUpdated, actions: { backToList } } = this.props;

    if (isUpdated) {
      backToList();
    }
  };

  onSaveAndDelete = async () => {
    const {
      actions: { deleteOrRestore },
      links: { editableLink },
    } = this.props;

    await deleteOrRestore([editableLink.id], 'soft_delete');
    this.linkForm.onSave();
  };

  isNew = () => {
    const { editableLinkId, isNewLink } = this.props;

    return !editableLinkId && isNewLink;
  };

  onCancel = () => {
    this.setState(prevProps => ({ ...prevProps, showDeleteModal: false }));
  };

  backToList = () => {
    const { actions: { backToList } } = this.props;
    backToList(backToList);
  };

  render() {
    const { isLoading, error } = this.props;
    const { showDeleteModal, isFormLoading } = this.state;
    const { linkDeleteModal } = constants;

    return (
      <LayoutWrapper>
        <Box>
          <SinglePageWrapper>
            <div className="PageContent">
              <div className="Info">
                <div className="LeftSideContent">
                  <h3 className="Title">Link Info</h3>
                </div>
              </div>
              {error && error.map(err => (
                <Alert key={err.message} message="Error" description={err.message} type="error" style={{ marginTop: '10px' }} />
              ))}
              { isLoading
                ? <Loader />
                : (
                  <LinkForm
                    {...this.props}
                    onRef={(ref) => { this.linkForm = ref; }}
                    onStatusChange={this.onStatusChange}
                    changeLoading={status => this.setState({ isFormLoading: status })}
                    isNew={this.isNew}
                  />
                )
              }
              <div className="ButtonWrapper" />
              <div className="PageHeader">
                <Button color="primary" onClick={() => this.backToList(true)}>
                  <span>Back to link list</span>
                </Button>
                <Button
                  type="primary"
                  onClick={() => this.linkForm.onSave()}
                  disabled={isFormLoading}
                  className="saveBtn"
                >
                  <span>Save link</span>
                </Button>
              </div>
            </div>
            <DeleteModal
              show={showDeleteModal}
              onOk={this.onSaveAndDelete}
              okText={linkDeleteModal.ok}
              type="single"
              onCancel={this.onCancel}
            />
          </SinglePageWrapper>
        </Box>
      </LayoutWrapper>
    );
  }
}

SingleLink.defaultProps = defaultProps;
SingleLink.propTypes = propTypes;

export default SingleLink;
