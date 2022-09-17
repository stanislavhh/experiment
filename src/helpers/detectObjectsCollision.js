export default function detectObjectsCollision(object1, object2) {
  if (!object1.geometry.boundingBox) {
    object1.geometry.computeBoundingBox(); 
  }

  if (!object2.geometry.boundingBox) {
    object2.geometry.computeBoundingBox();
  }

  object1.updateMatrixWorld();
  object2.updateMatrixWorld();
  

  const copy1 = object1.geometry.boundingBox.clone();
  copy1.applyMatrix4(object1.matrixWorld);

  const copy2 = object2.geometry.boundingBox.clone();
  copy2.applyMatrix4(object2.matrixWorld);

  return copy1.intersectsBox(copy2);
}