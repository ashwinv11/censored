conn = new Mongo();
db = conn.getDB("itsyourfault_development");

cursor = db.district_old.find({DISTRICT: "PUDUCHERRY"});
while ( cursor.hasNext() ) {
   printjson( cursor.next() );
}