let sortedBtn = document.getElementById("sorted");

sortedBtn.addEventListener("change", async (e) => {
  let sortArr = sortedBtn.value.split("--");
  await sorted(sortArr[0], sortArr[1]);
});

async function sorted(dir, order) {
  let bookmarks = await chrome.bookmarks.getTree();
  let newBookmarks = [];
  bookmarks.forEach((elm) => {
    elm.children.forEach(async (el) => {      
      newBookmarks = el.children;
      newBookmarks.sort((a, b) => {        
        if (order == 'a')
          if (dir == 'title') 
            return a.title.localeCompare(b.title);
          else
            return a.dateAdded - b.dateAdded;
        else 
          if (dir == 'title') 
            return b.title.localeCompare(a.title);
          else
            return b.dateAdded - a.dateAdded;
      });      
      let idx = 0;
      newBookmarks.forEach(async (e) => {
        await chrome.bookmarks.move(e.id, {index: idx++, parentId: e.parentId});        
      });      
    });
  });
}
