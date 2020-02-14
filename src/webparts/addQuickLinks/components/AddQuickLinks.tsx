import * as React from 'react';
import styles from './AddQuickLinks.module.scss';
import { IAddQuickLinksProps } from './IAddQuickLinksProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class AddQuickLinks extends React.Component<IAddQuickLinksProps, IAddQuickLinksProps> {

  constructor(props) {
    super(props);
    this.state = {
      formData: {
        title: '',
        url: ''
      }
    };
  }

  formHandler() {
    var data = this.state.formData;
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

                <strong>Title:</strong> <br /> <input type="text" name="title" placeholder="Title" onChange={(e) => this.inputChangeHandler.call(this, e)} value={this.state.formData.title} /> <br />

                <strong>URL:</strong> <br /> <input type="text" name="url" placeholder="URL" onChange={(e) => this.inputChangeHandler.call(this, e)} value={this.state.formData.url} /> <br />

                <button onClick={(e) => this.formHandler()}>Submit</button>
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
