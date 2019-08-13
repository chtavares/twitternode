import bookshelf from '../bookshelf'

export default bookshelf.Model.extend({
    tableName: 'posts',
    hasTimestamps: true,
    uuid: true,
    user_id: true,
    toJSON: function () {
        const attrs = bookshelf.Model.prototype.toJSON.apply(this, arguments)
        delete attrs.created_at
        delete attrs.updated_at

        return attrs
    }
})
