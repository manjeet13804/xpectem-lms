import React from 'react';
import { generateEditUrl } from 'helpers/utility';
import PropTypes from 'prop-types';

export default function ReleatedEntitesList(props) {
  const { entities, className } = props;

  return (
    <ul className={className}>
      {
        entities.map((entity) => {
          const url = generateEditUrl({ name: entity.entityName, id: entity.id });

          return (
            <li key={entity.id} className={`${className}__item`}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {entity.name}
              </a>
            </li>
          );
        })
      }
    </ul>
  );
}

ReleatedEntitesList.propTypes = {
  entities: PropTypes.arrayOf(PropTypes.any).isRequired,
  className: PropTypes.string,
};

ReleatedEntitesList.defaultProps = {
  className: '',
};
