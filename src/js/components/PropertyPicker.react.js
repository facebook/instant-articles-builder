/**
 * Copyright 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

const React = require('react');
const classNames = require('classnames');
const DateTimeFormatPicker = require('./DateTimeFormatPicker.react.js');
const SelectorPicker = require('./SelectorPicker.react.js');
import type { RuleProperty } from '../models/RuleProperty';
import RulePropertyTypes from '../models/RulePropertyTypes';

import type { Props as BaseProps } from '../containers/AppContainer.react';

type Props = BaseProps & { property: RuleProperty };

class PropertyPicker extends React.Component<Props> {
  render() {
    let property = this.props.property;
    let attributes = null;
    let warning = null;

    // Look for the attributes for the current selector on the global attribute store
    if (property.selector) {
      attributes = this.props.app.attributes.get(property.selector);
    }

    if (false) {
      warning = property.definition.unique ? (
        <div className="warning">
          Warning: the current selector matches {'N'} elements, but only the
          first one will be used.
        </div>
      ) : (
        <div className="notice">
          The current selector matches {'N'} elements.
        </div>
      );
    }

    const dateTimeFormatPicker = property.definition.supportedTypes.includes(
      RulePropertyTypes.DATETIME
    )
      ? null //<DateTimeFormatPicker {...this.props} />
      : null;

    const attributePicker = (
      <div
        className="attributes"
        style={attributes == null ? { display: 'none' } : {}}
      >
        <label className="sub-label">Attribute</label>
        <select value={property.definition.defaultAttribute}>
          {attributes &&
            attributes.map(attribute => (
              <option
                value={attribute.name}
                data-attribute-value={attribute.value}
                key={attribute.name}
              >
                {attribute.name}: "{attribute.value.trim()}"
              </option>
            ))}
        </select>
        {dateTimeFormatPicker}
      </div>
    );

    return (
      <div
        className={classNames({
          'field-line': true,
          'single-element-found': false,
          'multiple-elements-found': false,
          multiple: !this.props.property.definition.unique,
        })}
      >
        <label>
          {this.props.property.definition.displayName}
          <span />
        </label>

        <label className="sub-label">Selector</label>
        <SelectorPicker {...this.props} target={this.props.property} />
        {warning}

        {attributePicker}
      </div>
    );
  }
}

module.exports = PropertyPicker;
