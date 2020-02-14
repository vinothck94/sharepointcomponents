import * as React from 'react';
import styles from './AddQuickLinks.module.scss';
import { IAddQuickLinksProps } from './IAddQuickLinksProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/items/list";


export default class AddQuickLinks extends React.Component<IAddQuickLinksProps, IAddQuickLinksProps> {

  constructor(props) {
    super(props);
    this.state = {
      formData: {
        Title: '',
        Url: ''
      }
    };
  }

  formHandler() {
    var objModel = this.state.formData;
    sp.web.lists
        .getByTitle("QuickLinks")
        .items.add(objModel)
        .then((response) => {
          alert(response.data.Id + '');
        });
  }

  inputChangeHandler(e) {
    // let formData = { ...this.state.formData };
    let formData = this.state.formData;
    formData[e.target.name] = e.target.value;
    this.setState({
      formData
    });
  }

  public render(): React.ReactElement<IAddQuickLinksProps> {
    return (
      <div className={styles.addQuickLinks}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <form>

                <strong>Title:</strong> <br /> <input type="text" name="Title" placeholder="Title" onChange={(e) => this.inputChangeHandler.call(this, e)} value={this.state.formData.Title} /> <br />

                <strong>URL:</strong> <br /> <input type="text" name="Url" placeholder="URL" onChange={(e) => this.inputChangeHandler.call(this, e)} value={this.state.formData.Url} /> <br />

                <button type="button" onClick={(e) => this.formHandler()}>Submit</button>
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
