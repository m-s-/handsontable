describe('Core_keepEmptyRows', function () {
  var id = 'testContainer';

  beforeEach(function () {
    this.$container = $('<div id="' + id + '"></div>').appendTo('body');
  });

  afterEach(function () {
    if (this.$container) {
      this.$container.remove();
    }
  });

  var arrayOfNestedObjects = [
    {id: 1, name: {
      first: "Ted",
      last: "Right"
    }, address: "Street Name", zip: "80410", city: "City Name"},
    {id: 2, name: {
      first: "Frank",
      last: "Honest"
    }, address: "Street Name", zip: "80410", city: "City Name"},
    {id: 3, name: {
      first: "Joan",
      last: "Well"
    }, address: "Street Name", zip: "80410", city: "City Name"}
  ];

  it('should remove columns if needed', function () {
    handsontable({
      data: arrayOfNestedObjects,
      columns: [
        {data: "id"},
        {data: "name.first"}
      ]
    });
    expect(this.$container.find('tbody tr:first td').length).toEqual(2);
  });

  it('should create columns if needed', function () {
    handsontable({
      data: arrayOfNestedObjects,
      columns: [
        {data: "id"},
        {data: "name.first"},
        {data: "name.last"},
        {data: "address"},
        {data: "zip"},
        {data: "city"}
      ]
    });
    expect(this.$container.find('tbody tr:first td').length).toEqual(6);
  });

  it('should create spare cols and rows on init', function () {
    handsontable({
      data: [
        ["one", "two"],
        ["three", "four"]
      ],
      startCols: 4,
      startRows: 4,
      minSpareRows: 4,
      minSpareCols: 4
    });

    var $tds = this.$container.find('.htCore tbody td');
    expect($tds.length).toEqual(36);
  });
});