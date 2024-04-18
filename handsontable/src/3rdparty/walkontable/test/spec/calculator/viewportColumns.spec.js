describe('Walkontable viewport columns calculator', () => {
  beforeEach(function() {
    this.$wrapper = $('<div></div>').addClass('handsontable');
    this.$container = $('<div></div>');
    this.$table = $('<table></table>').addClass('htCore'); // create a table that is not attached to document
    this.$wrapper.append(this.$container);
    this.$container.append(this.$table);
    this.$wrapper.appendTo('body');
    createDataArray(100, 4);
  });

  afterEach(function() {
    this.$wrapper.remove();

    if (this.wotInstance) {
      this.wotInstance.destroy();
    }
  });

  describe('isVisibleInTrimmingContainer property', () => {
    it('Should be `true` if the entire table is in the viewport when checking for fully visible columns AND if the' +
      ' entire table except for the last column is in the viewport when checking for partially visible columns,' +
      ' `false` otherwise (table on the "start" side of the viewport)', async() => {
      spec().$wrapper.css({
        paddingInlineEnd: '10000px'
      });

      createDataArray(50, 50);

      const wt = walkontable({
        data: getData,
        totalRows: getTotalRows,
        totalColumns: getTotalColumns
      });

      wt.draw();

      const tableWidth = $(wt.wtTable.hider).width();
      const tableOffset = spec().$container.offset().left;

      expect(wt.wtViewport.createColumnsCalculator(3).isVisibleInTrimmingContainer).toBe(true);
      expect(wt.wtViewport.createColumnsCalculator(2).isVisibleInTrimmingContainer).toBe(true);
      expect(wt.wtViewport.createColumnsCalculator(1).isVisibleInTrimmingContainer).toBe(true);

      window.scrollBy(Math.floor(tableOffset + (tableWidth / 2)), 0);

      await sleep(100);

      expect(wt.wtViewport.createColumnsCalculator(3).isVisibleInTrimmingContainer).toBe(true);
      expect(wt.wtViewport.createColumnsCalculator(2).isVisibleInTrimmingContainer).toBe(true);
      expect(wt.wtViewport.createColumnsCalculator(1).isVisibleInTrimmingContainer).toBe(true);

      window.scrollBy(Math.floor(tableWidth / 2) - 1, 0);

      await sleep(100);

      expect(wt.wtViewport.createColumnsCalculator(3).isVisibleInTrimmingContainer).toBe(true);
      expect(wt.wtViewport.createColumnsCalculator(2).isVisibleInTrimmingContainer).toBe(false);
      expect(wt.wtViewport.createColumnsCalculator(1).isVisibleInTrimmingContainer).toBe(true);

      window.scrollBy(1, 0);

      await sleep(100);

      expect(wt.wtViewport.createColumnsCalculator(3).isVisibleInTrimmingContainer).toBe(false);
      expect(wt.wtViewport.createColumnsCalculator(2).isVisibleInTrimmingContainer).toBe(false);
      expect(wt.wtViewport.createColumnsCalculator(1).isVisibleInTrimmingContainer).toBe(false);

      window.scrollBy(1000, 0);

      await sleep(100);

      expect(wt.wtViewport.createColumnsCalculator(3).isVisibleInTrimmingContainer).toBe(false);
      expect(wt.wtViewport.createColumnsCalculator(2).isVisibleInTrimmingContainer).toBe(false);
      expect(wt.wtViewport.createColumnsCalculator(1).isVisibleInTrimmingContainer).toBe(false);
    });

    it('Should be `true` if the entire table is in the viewport,' +
      ' `false` otherwise (table on the "end" side of the viewport)', async() => {
      spec().$wrapper.css({
        marginInlineStart: '10000px'
      });

      createDataArray(50, 50);

      const wt = walkontable({
        data: getData,
        totalRows: getTotalRows,
        totalColumns: getTotalColumns
      });

      wt.draw();

      const tableWidth = $(wt.wtTable.hider).width();
      const tableOffset = spec().$container.offset().left;

      expect(wt.wtViewport.createColumnsCalculator(3).isVisibleInTrimmingContainer).toBe(false);
      expect(wt.wtViewport.createColumnsCalculator(2).isVisibleInTrimmingContainer).toBe(false);
      expect(wt.wtViewport.createColumnsCalculator(1).isVisibleInTrimmingContainer).toBe(false);

      window.scrollBy(tableOffset - window.innerWidth + getScrollbarWidth(), 0);

      await sleep(100);

      expect(wt.wtViewport.createColumnsCalculator(3).isVisibleInTrimmingContainer).toBe(false);
      expect(wt.wtViewport.createColumnsCalculator(2).isVisibleInTrimmingContainer).toBe(false);
      expect(wt.wtViewport.createColumnsCalculator(1).isVisibleInTrimmingContainer).toBe(false);

      window.scrollBy(1, 0);

      await sleep(100);

      expect(wt.wtViewport.createColumnsCalculator(3).isVisibleInTrimmingContainer).toBe(true);
      expect(wt.wtViewport.createColumnsCalculator(2).isVisibleInTrimmingContainer).toBe(false);
      expect(wt.wtViewport.createColumnsCalculator(1).isVisibleInTrimmingContainer).toBe(true);

      window.scrollBy(tableWidth / 2, 0);

      await sleep(100);

      expect(wt.wtViewport.createColumnsCalculator(3).isVisibleInTrimmingContainer).toBe(true);
      expect(wt.wtViewport.createColumnsCalculator(2).isVisibleInTrimmingContainer).toBe(true);
      expect(wt.wtViewport.createColumnsCalculator(1).isVisibleInTrimmingContainer).toBe(true);

      window.scrollBy(tableWidth / 2, 0);

      await sleep(100);

      expect(wt.wtViewport.createColumnsCalculator(3).isVisibleInTrimmingContainer).toBe(true);
      expect(wt.wtViewport.createColumnsCalculator(2).isVisibleInTrimmingContainer).toBe(true);
      expect(wt.wtViewport.createColumnsCalculator(1).isVisibleInTrimmingContainer).toBe(true);
    });

  });
});
