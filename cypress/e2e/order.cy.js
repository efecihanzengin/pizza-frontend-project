describe('Pizza Order Form', () => {
  beforeEach(() => {
    // Her testten önce sipariş sayfasına git
    cy.visit('/order')
  })

  it('should validate minimum and maximum toppings selection', () => {
    // İsim gir
    cy.get('[data-cy="username-input"]').type('Test User')

    // 3 malzeme seç (minimum 4 olduğu için buton disabled olmalı)
    cy.get('[data-cy="topping-checkbox"]').first().click()
    cy.get('[data-cy="topping-checkbox"]').eq(1).click()
    cy.get('[data-cy="topping-checkbox"]').eq(2).click()
    
    // Sipariş Ver butonu disabled olmalı
    cy.get('[data-cy="submit-order"]').should('be.disabled')

    // 4. malzemeyi seç (artık buton enabled olmalı)
    cy.get('[data-cy="topping-checkbox"]').eq(3).click()
    cy.get('[data-cy="submit-order"]').should('not.be.disabled')

    // 7 malzeme daha seç (toplam 11 olacak, son tıklama çalışmamalı)
    for(let i = 4; i < 11; i++) {
      cy.get('[data-cy="topping-checkbox"]').eq(i).click()
    }

    // Son malzeme seçili olmamalı (maximum 10)
    cy.get('[data-cy="topping-checkbox"]').eq(10).should('not.be.checked')
  })

  it('should calculate total price correctly', () => {
    // Pizza adedi ve malzeme seçimlerine göre toplam fiyat kontrolü
    
    // İlk fiyatı kaydet
    cy.get('[data-cy="total-price"]').invoke('text').then((initialPrice) => {
      const initial = parseFloat(initialPrice)

      // Pizza adedini 2'ye çıkar
      cy.get('[data-cy="increase-pizza-count"]').click()
      
      // Yeni fiyat ilk fiyatın 2 katı olmalı
      cy.get('[data-cy="total-price"]').invoke('text').then((newPrice) => {
        const updated = parseFloat(newPrice)
        expect(updated).to.equal(initial * 2)
      })

      // 4 malzeme seç
      for(let i = 0; i < 4; i++) {
        cy.get('[data-cy="topping-checkbox"]').eq(i).click()
      }

      // Her malzeme 5₺, 2 pizza için toplam ek ücret: 4 * 5 * 2 = 40₺
      cy.get('[data-cy="topping-price"]').should('contain', '40')
    })
  })

  it('should handle form submission correctly', () => {
    // Form gönderimi testi
    
    // Gerekli alanları doldur
    cy.get('[data-cy="username-input"]').type('Test User')
    
    // 4 malzeme seç
    for(let i = 0; i < 4; i++) {
      cy.get('[data-cy="topping-checkbox"]').eq(i).click()
    }

    // Hamur kalınlığı seç
    cy.get('[data-cy="dough-select"]').select('ince')

    // Not ekle
    cy.get('[data-cy="order-note"]').type('Test sipariş notu')

    // Form gönder
    cy.get('[data-cy="submit-order"]').click()

    // Başarılı sipariş mesajını kontrol et
    cy.get('[data-cy="success-message"]').should('be.visible')
    
    // API çağrısını kontrol et
    cy.intercept('POST', 'https://reqres.in/api/users').as('orderSubmit')
    cy.wait('@orderSubmit').then((interception) => {
      expect(interception.response.statusCode).to.equal(201)
      expect(interception.request.body).to.have.property('username', 'Test User')
      expect(interception.request.body.selectedToppings).to.have.length(4)
    })
  })
})
