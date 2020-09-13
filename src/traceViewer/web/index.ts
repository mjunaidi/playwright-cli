1/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { TraceModel } from '../traceModel';
import './common.css';
import './components/dialog.css';
import { dom } from './components/dom';
import './components/dropTarget.css';
import './components/listView.css';
import './components/splitView.css';
import './components/tabbedPane.css';
import './components/toolbarView.css';
import { ActionListView } from './ui/actionListView';
import './ui/actionListView.css';
import { PropertiesTabbedPane } from './ui/propertiesTabbedPane';


function renderTraceModel(trace: TraceModel) {
	const context = trace.contexts[0];
  const size = context.created.viewportSize!;
  const tabbedPane = new PropertiesTabbedPane(size);

  const actionListView = new ActionListView(context, tabbedPane);
  document.body.appendChild(dom`
    <hbox>
      ${actionListView.element}
      ${tabbedPane.element}
    </hbox>
  `);
}

function platformName(): string {
  if (window.navigator.userAgent.includes('Linux'))
    return 'platform-linux';
  if (window.navigator.userAgent.includes('Windows'))
    return 'platform-windows';
  if (window.navigator.userAgent.includes('Mac'))
    return 'platform-mac';
  return 'platform-generic';
}

(async () => {
  document!.defaultView!.addEventListener('focus', (event: any) => {
    if (event.target.document.nodeType === Node.DOCUMENT_NODE)
      document.body.classList.remove('inactive');
  }, false);
  document!.defaultView!.addEventListener('blur', event => {
    document.body.classList.add('inactive');
  }, false);
	document.body.classList.add(platformName());
	const traceModel = await (window as any).getTraceModel() as TraceModel;
  renderTraceModel(traceModel);
})();
