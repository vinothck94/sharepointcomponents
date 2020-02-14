import * as React from 'react';
import styles from './QuickLinks.module.scss';
import { IQuickLinksProps } from './IQuickLinksProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";
import "@pnp/sp/items/list";

export default class QuickLinks extends React.Component<IQuickLinksProps, IQuickLinksProps> {

    constructor(props) {
        super(props);
        this.state = {
            description: 'Local description',
            items: []
        };
        this.loadLinks();
    }

    private loadLinks() {
        sp.web.lists.getByTitle('QuickLinks').items.getAll().then((quickLinks: IQuickLinksProps[]) => {
            this.setState({
                items: this.state.items.concat(quickLinks)
            });
        });
    }

    public render(): React.ReactElement<IQuickLinksProps> {
        return (
            <div className={styles.quickLinks}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <span className={styles.title}>Welcome to SharePoint!</span>
                            <p className={styles.description}>{escape(this.props.description)}</p>
                            <p className={styles.description}>{escape(this.state.description)}</p>
                            {
                                this.state.items.map((val, index) =>
                                    <a target="_blank" href={val.Url} className={styles.button}>
                                        <span className={styles.label}>{val.Title}</span>
                                    </a>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}