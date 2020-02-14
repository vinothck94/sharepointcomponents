import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'AddQuickLinksWebPartStrings';
import AddQuickLinks from './components/AddQuickLinks';
import { IAddQuickLinksProps } from './components/IAddQuickLinksProps';

export interface IAddQuickLinksWebPartProps {
  description: string;
}

export default class AddQuickLinksWebPart extends BaseClientSideWebPart<IAddQuickLinksWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAddQuickLinksProps> = React.createElement(
      AddQuickLinks, {
        formData: {
          title: '',
          url: ''
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
