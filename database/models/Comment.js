import bookshelf from '../bookshelf'

export default bookshelf.Model.extend({
  tableName: 'comments',
  hasTimestamps: true,
  content: true,
  uuid: true,
  toJSON: function () {
    const attrs = bookshelf.Model.prototype.toJSON.apply(this, arguments)
    delete attrs.created_at
    delete attrs.updated_at

    return attrs
  }
})