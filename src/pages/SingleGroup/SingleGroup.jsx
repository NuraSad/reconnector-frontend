function SingleGroup() {
  //pulls in a few parts of information from group (look at database)
  //pulls in the rest from events for the group
  return (
    <section className="singleGroup">
      <h1 className="singleGroup__title">Zen Yoga After Hours 🧘‍♂️</h1>
      <div className="singleGroup__header">
        <div className="singleGroup__header--left">
          <div className="singleGroup__header--days"></div>
        </div>
      </div>
      <div className="singleGroup__columns">
        <div className="singleGroup__col-1"></div>
        <div className="singleGroup__col-2"></div>
      </div>
    </section>
  );
}

export default SingleGroup;
