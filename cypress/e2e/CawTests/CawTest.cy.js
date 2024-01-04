/// <reference types="cypress" />

import tablepage from "../../Pages/tablepage";

describe('Feeding data to the table', () => {
  //using beforeeach hook
  beforeEach(() => {
    cy.visit('https://testpages.herokuapp.com/styled/tag/dynamic-table.html')
  })

  it('verify json data and the table data is the same!', () => {
    //click on the Table Data marker |>

    tablepage.TableDataMarker.click();
    //clearing the testarea box where json is to over write.
    tablepage.TextareaInput.click().clear();

    //Use of fixture data sampledata.json
    cy.fixture("sampledata.json").then((jsondata) => {

      //converting from jSon to string and typing into the textarea box
      var users = JSON.stringify(jsondata, null, 1);
      tablepage.textareaInput.type(users);

      //clicking the refreshTable button
      tablepage.clickRefreshTableButton.click();

      tablepage.tableRows.each(($row, index) => {
        const user = jsondata[index];

        // Extract data from the table row and compare with JSON data
        cy.wrap($row).then(($cells) => {
          if (index === 0) {
            // This is a header row ,trimming the blankspaces.
            expect($cells.eq(0).text().trim()).to.include('name');
            expect($cells.eq(1).text().trim()).to.include('age');
            expect($cells.eq(2).text().trim()).to.include('gender');
          } else {
            //assertion of table data with the json data
            expect($cells.eq(0).text().trim()).to.include(user.name);  //asserting table name with json name
            expect($cells.eq(1).text().trim()).to.include(String(user.age)); // Assuming age is a number
            expect($cells.eq(2).text().trimEnd()).to.includes(user.gender);  //asserting table gender wth json gender
          }
        });
      });

    })
  })
})
