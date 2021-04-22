
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    localStorage.clear()
    const user = {
      name: 'Teukkis Teukkula',
      username: 'tukkula',
      password: 'tukka'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('#login_username_label').contains('username')
    cy.get('#login_password_label').contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#login_username_input').type('tukkula')
      cy.get('#login_password_input').type('tukka')
      cy.get('#login_button').click()
      cy.contains('tukkula logged in')

    })

    it('fails with wrong credentials', function() {
      cy.get('#login_username_input').type('tukkulaVaara')
      cy.get('#login_password_input').type('tukkaVaara')
      cy.get('#login_button').click()
      cy.contains('Invalid credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'tukkula', password: 'tukka' })
    })

    it('A blog can be created', function() {
      cy.get('#new_blog_button').click()
      cy.get('#title').type('A title for the new blog')
      cy.get('#url').type('URL for the new blog')
      cy.get('#author').type('An author for the new blog')
      cy.get('#create_new_blog_button').click()
      cy.contains('A title for the new blog created successfully')
      cy.contains('A title for the new blog')
    })

    describe('like like', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'shit hit the fan sometimes1',
          url: 'www.yesitdoes1.com',
          author: 'the fan1'
        })

        cy.createBlog({
          title: 'shit hit the fan sometimes2',
          url: 'www.yesitdoes2.com',
          author: 'the fan2'
        })
      })

      it('A blog can be liked', function() {
        cy.contains('shit hit the fan sometimes1')
        cy.contains('view').click()
        cy.get('#number_of_likes').contains(0)
        cy.get('#like_button').click()
        cy.get('#number_of_likes').contains(1)
      })

      it('blog can be removed', function() {
        cy.contains('shit hit the fan sometimes1')
          .parent().find('button').click()
        cy.get('#remove_button').click()
        cy.on('window:confirm', () => true)

        cy.get('html').should('not.contain', 'shit hit the fan sometimes1')
      })
    })

    describe('sorting blogs', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'shit hit the fan sometimes1',
          url: 'www.yesitdoes1.com',
          author: 'the fan1',
          likes: 5
        })

        cy.createBlog({
          title: 'shit hit the fan sometimes2',
          url: 'www.yesitdoes2.com',
          author: 'the fan2',
          likes: 51
        })

        cy.createBlog({
          title: 'shit hit the fan sometimes3',
          url: 'www.yesitdoes3.com',
          author: 'the fan3',
          likes: 1
        })
      })

      it('blogs are sorted in descending order', function() {
        let tempA = [51, 5, 1]
        cy.get('.blogItem').each(($el, index, $list) => {

          cy.get('#show_full_blog').click()
          cy.get('#number_of_likes').contains(tempA[index])
        })
        console.log(tempA)
      })
    })
  })
})