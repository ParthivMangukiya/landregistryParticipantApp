/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for landregistryApp', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be landregistryApp', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('landregistryApp');
    })
  });

  it('network-name should be landregistry@0.0.2',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('landregistry@0.0.2.bna');
    });
  });

  it('navbar-brand should be landregistryApp',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('landregistryApp');
    });
  });

  
    it('Land component should be loadable',() => {
      page.navigateTo('/Land');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Land');
      });
    });

    it('Land table should have 8 columns',() => {
      page.navigateTo('/Land');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  
    it('PendingLandTransaction component should be loadable',() => {
      page.navigateTo('/PendingLandTransaction');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('PendingLandTransaction');
      });
    });

    it('PendingLandTransaction table should have 9 columns',() => {
      page.navigateTo('/PendingLandTransaction');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(9); // Addition of 1 for 'Action' column
      });
    });
  
    it('Loan component should be loadable',() => {
      page.navigateTo('/Loan');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Loan');
      });
    });

    it('Loan table should have 8 columns',() => {
      page.navigateTo('/Loan');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(8); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('LandDepartmentIndividual component should be loadable',() => {
      page.navigateTo('/LandDepartmentIndividual');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('LandDepartmentIndividual');
      });
    });

    it('LandDepartmentIndividual table should have 4 columns',() => {
      page.navigateTo('/LandDepartmentIndividual');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('PrivateIndividual component should be loadable',() => {
      page.navigateTo('/PrivateIndividual');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('PrivateIndividual');
      });
    });

    it('PrivateIndividual table should have 5 columns',() => {
      page.navigateTo('/PrivateIndividual');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('Bank component should be loadable',() => {
      page.navigateTo('/Bank');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Bank');
      });
    });

    it('Bank table should have 4 columns',() => {
      page.navigateTo('/Bank');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('Notary component should be loadable',() => {
      page.navigateTo('/Notary');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Notary');
      });
    });

    it('Notary table should have 5 columns',() => {
      page.navigateTo('/Notary');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('Agent component should be loadable',() => {
      page.navigateTo('/Agent');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Agent');
      });
    });

    it('Agent table should have 5 columns',() => {
      page.navigateTo('/Agent');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('RequestLandTransaction component should be loadable',() => {
      page.navigateTo('/RequestLandTransaction');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('RequestLandTransaction');
      });
    });
  
    it('ApprovePendingLandTransaction component should be loadable',() => {
      page.navigateTo('/ApprovePendingLandTransaction');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ApprovePendingLandTransaction');
      });
    });
  
    it('ContractingLoan component should be loadable',() => {
      page.navigateTo('/ContractingLoan');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('ContractingLoan');
      });
    });
  
    it('SetLandOnSale component should be loadable',() => {
      page.navigateTo('/SetLandOnSale');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('SetLandOnSale');
      });
    });
  

});