package com.equipo2.healthtech.model.account;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "account_transactions")
@NoArgsConstructor
@AllArgsConstructor
@Data
@EqualsAndHashCode(callSuper = false)
public class AccountTransactions {

    @Id()
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

}
