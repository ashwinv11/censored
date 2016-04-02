conn = new Mongo();
db = conn.getDB("test");

cursor = db.district_old.find({DISTRICT: "PUDUCHERRY"});
while ( cursor.hasNext() ) {
   printjson( cursor.next() );
}